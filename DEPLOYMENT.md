# Deployment Process — CodeLaunch Webinar Registration System

Complete step-by-step record of how this project was built and deployed on AWS Free Tier.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [AWS Architecture](#3-aws-architecture)
4. [Step 1 — DynamoDB Setup](#4-step-1--dynamodb-setup)
5. [Step 2 — IAM Role](#5-step-2--iam-role)
6. [Step 3 — SES Email Verification](#6-step-3--ses-email-verification)
7. [Step 4 — Lambda Function](#7-step-4--lambda-function)
8. [Step 5 — API Gateway](#8-step-5--api-gateway)
9. [Step 6 — Vue.js Frontend](#9-step-6--vuejs-frontend)
10. [Step 7 — S3 Static Hosting](#10-step-7--s3-static-hosting)
11. [Errors Encountered & Fixes](#11-errors-encountered--fixes)
12. [Teardown Instructions](#12-teardown-instructions)

---

## 1. Project Overview

A fully serverless webinar registration system built on AWS. Users fill out a registration form on the frontend, data is sent to an API Gateway endpoint, processed by a Lambda function, stored in DynamoDB, and a confirmation email is sent via SES.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | Vue.js 3 + Vue Router |
| Build Tool | Vite |
| Static Hosting | AWS S3 |
| API Layer | AWS API Gateway (HTTP API) |
| Backend | AWS Lambda (Node.js 20.x) |
| Database | AWS DynamoDB |
| Email | AWS SES |
| Security | AWS IAM |

---

## 3. AWS Architecture

```
Browser
  │
  ├── Static files (HTML/CSS/JS)
  │     └── AWS S3 (Static Website Hosting)
  │
  └── Form Submission (POST /register)
        └── AWS API Gateway (HTTP API)
              └── AWS Lambda (Node.js)
                    ├── AWS DynamoDB  ──→  Saves registration record
                    └── AWS SES       ──→  Sends confirmation email
```

**IAM Role** grants Lambda permission to access DynamoDB and SES.

---

## 4. Step 1 — DynamoDB Setup

**Service:** AWS DynamoDB
**Purpose:** Store all webinar registrations

### Configuration

```
Table name:      webinar-registrations
Partition key:   email (String)
Table settings:  Default (On-demand mode)
Region:          ap-southeast-1 (Singapore)
```

### Steps

1. Open AWS Console → DynamoDB → Create Table
2. Set table name to `webinar-registrations`
3. Set partition key to `email` with type `String`
4. Leave all other settings as default
5. Click Create Table

---

## 5. Step 2 — IAM Role

**Service:** AWS IAM
**Purpose:** Grant Lambda function permission to use DynamoDB and SES

### Steps

1. Open AWS Console → IAM → Roles → Create Role
2. Trusted entity: AWS Service → Lambda
3. Attach the following policies:
   - `AmazonDynamoDBFullAccess`
   - `AmazonSESFullAccess`
   - `CloudWatchLogsFullAccess`
4. Role name: `lambda-webinar-role`
5. Create Role

> **Note:** If you forget to attach this role during Lambda creation, you can add it later via Lambda → Configuration → Permissions → Edit execution role.

---

## 6. Step 3 — SES Email Verification

**Service:** AWS SES (Simple Email Service)
**Purpose:** Send confirmation emails to registered attendees

### Steps

1. Open AWS Console → SES → Verified Identities → Create Identity
2. Select **Email address** (not Domain)
3. Enter your email address
4. Check your inbox and click the AWS verification link
5. Status should show **Verified**

### Sandbox Mode Limitation

New AWS accounts are in SES Sandbox mode. This means:
- You can only send emails **to verified addresses**
- To send to any address, request **SES Production Access** via the SES console

---

## 7. Step 4 — Lambda Function

**Service:** AWS Lambda
**Purpose:** Process registration form submissions

### Configuration

```
Function name:   webinar-registration-handler
Runtime:         Node.js 20.x
Architecture:    x86_64
Execution role:  lambda-webinar-role
File name:       index.mjs  (ES Module syntax)
```

### Steps

1. Open AWS Console → Lambda → Create Function
2. Select Author from scratch
3. Set function name, runtime, and execution role
4. In the code editor, create `index.mjs`
5. Paste the Lambda handler code (see source file)
6. Click Deploy

### Lambda Handler Logic

```
Receive POST request from API Gateway
  → Parse JSON body
  → Validate required fields (firstName, lastName, email, level)
  → Save record to DynamoDB with PutItem
  → Send confirmation email via SES
  → Return 200 success response
  → On duplicate email: return 409 conflict
  → On any error: return 500 with error message
```

### CORS Headers

Every Lambda response includes:

```javascript
{
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "POST,OPTIONS"
}
```

---

## 8. Step 5 — API Gateway

**Service:** AWS API Gateway (HTTP API)
**Purpose:** Expose a public REST endpoint for the registration form

### Configuration

```
API type:      HTTP API
API name:      webinar-api
Route:         POST /register
Integration:   Lambda → webinar-registration-handler
Stage:         $default (Auto-deploy: ON)
```

### Steps

1. Open AWS Console → API Gateway → Create API → HTTP API → Build
2. Add integration: Lambda → `webinar-registration-handler`
3. Set API name: `webinar-api`
4. Configure route: `POST /register`
5. Stage: `$default` with Auto-deploy enabled
6. Create

### CORS Configuration

```
Access-Control-Allow-Origin:    *
Access-Control-Allow-Headers:   content-type
Access-Control-Allow-Methods:   POST, OPTIONS
Access-Control-Max-Age:         300
```

> CORS must be configured on API Gateway AND Lambda responses must include CORS headers. Both are required for browser requests to work.

### Getting the Invoke URL

```
API Gateway → webinar-api → Stages → $default → Invoke URL

Format: https://xxxxxxxxxx.execute-api.ap-southeast-1.amazonaws.com
Endpoint: https://xxxxxxxxxx.execute-api.ap-southeast-1.amazonaws.com/register
```

---

## 9. Step 6 — Vue.js Frontend

**Framework:** Vue.js 3 with Vue Router and Vite

### Project Structure

```
src/
├── main.js
├── App.vue
├── style.css
├── router/
│   └── index.js
├── views/
│   ├── HomeView.vue
│   ├── ModulesPage.vue
│   └── ModuleDetail.vue
└── components/
    ├── NavBar.vue
    ├── HeroSection.vue
    ├── CountdownTimer.vue
    ├── StatsBar.vue
    ├── LearnSection.vue
    ├── SpeakerSection.vue
    ├── AgendaSection.vue
    ├── RegisterForm.vue
    ├── FaqSection.vue
    └── FooterSection.vue

public/
├── hero-pic.png
└── speaker.png
```

### Router Configuration

```javascript
// Uses hash history for S3 compatibility
createRouter({ history: createWebHashHistory() })

Routes:
  /              → HomeView.vue
  /modules       → ModulesPage.vue
  /modules/:id   → ModuleDetail.vue
```

> Hash history (`createWebHashHistory`) is used instead of HTML5 history so that S3 static hosting does not need server-side redirect configuration for deep links.

### API Integration in RegisterForm.vue

```javascript
const API_URL = 'https://YOUR-ID.execute-api.ap-southeast-1.amazonaws.com/register'

const res = await fetch(API_URL, {
  method:  'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ firstName, lastName, email, phone, level, source })
})
```

### Build Command

```bash
npm install
npm run build
# Output: dist/ folder
```

---

## 10. Step 7 — S3 Static Hosting

**Service:** AWS S3
**Purpose:** Host the built Vue.js application as a static website

### Bucket Configuration

```
Bucket name:          codelaunch-webinar-2026
Region:               ap-southeast-1
Block public access:  OFF (all unchecked)
Static website:       Enabled
Index document:       index.html
Error document:       index.html
```

### Bucket Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::codelaunch-webinar-2026/*"
    }
  ]
}
```

### Steps

1. Create bucket with the name above
2. Uncheck all Block Public Access settings
3. Enable Static Website Hosting
4. Add the bucket policy above
5. Run `npm run build` in the Vue project
6. Upload `dist/index.html` and `dist/assets/` folder to S3

### Website URL

```
http://codelaunch-webinar-2026.s3-website-ap-southeast-1.amazonaws.com
```

---

## 11. Errors Encountered & Fixes

### Error 1 — NoSuchWebsiteConfiguration

```
404 Not Found
Code: NoSuchWebsiteConfiguration
```

**Cause:** Static Website Hosting was not enabled on the S3 bucket.

**Fix:** S3 → Bucket → Properties → Static Website Hosting → Enable → index.html / index.html

---

### Error 2 — AccessDenied on S3

```
403 Forbidden
Code: AccessDenied
```

**Cause:** Block Public Access was still enabled or bucket policy was missing.

**Fix:** Uncheck all Block Public Access settings → Add bucket policy with `s3:GetObject` permission.

---

### Error 3 — Lambda AccessDeniedException

```
AccessDeniedException: User is not authorized to perform: dynamodb:PutItem
```

**Cause:** Lambda was using its auto-generated role instead of `lambda-webinar-role`. The auto-generated role had no DynamoDB permissions.

**Fix:** Lambda → Configuration → Permissions → Edit execution role → Attach `AmazonDynamoDBFullAccess` and `AmazonSESFullAccess`.

---

### Error 4 — CORS Policy Error

```
Access to fetch blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present
```

**Cause:** API Gateway did not have CORS configured. Browser preflight OPTIONS request was rejected.

**Fix:**
1. API Gateway → webinar-api → CORS → Configure with `*` origin, `content-type` header, `POST OPTIONS` methods
2. Lambda responses must also return CORS headers in every response
3. Redeploy API Gateway to `$default` stage after CORS changes

---

### Error 5 — ERR_NAME_NOT_RESOLVED

```
POST https://your-api-id.execute-api... net::ERR_NAME_NOT_RESOLVED
```

**Cause:** The API URL placeholder was not replaced with the real API Gateway invoke URL before building.

**Fix:** Update `API_URL` in `RegisterForm.vue` with the real invoke URL → rebuild → re-upload to S3.

---

## 12. Teardown Instructions

To remove all AWS resources and avoid any charges:

```
1. S3
   → Empty bucket (select all → delete)
   → Delete bucket

2. API Gateway
   → webinar-api → Actions → Delete

3. Lambda
   → webinar-registration-handler → Actions → Delete function

4. DynamoDB
   → webinar-registrations → Actions → Delete table

5. IAM
   → Roles → lambda-webinar-role → Delete

6. SES
   → Verified Identities → Select email → Delete identity
```

Total time to tear down: approximately 10 minutes.

---

## Free Tier Usage Summary

| Service | Free Limit | This Project's Usage |
|---|---|---|
| S3 Storage | 5 GB | Less than 5 MB |
| S3 Requests | 20,000 GET / month | Minimal |
| Lambda | 1M requests / month | Minimal |
| API Gateway | 1M calls / month | Minimal |
| DynamoDB | 25 GB storage | Less than 1 MB |
| SES | 3,000 emails / month | Minimal |

This project will stay within free tier limits unless it receives millions of visitors per month.
