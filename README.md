# CodeLaunch — Webinar Registration System

A fully serverless webinar registration platform built on AWS, featuring a Vue.js 3 frontend and a complete AWS backend stack. Built as a portfolio project to demonstrate real-world cloud architecture using AWS Free Tier services.

---

## Live Demo

[View Live Site](http://codelaunch-webinar-2026.s3-website-ap-southeast-1.amazonaws.com)

---

## Project Summary

CodeLaunch is a registration landing page for a free 3-part web development webinar series covering HTML, CSS, and JavaScript. Users can browse course modules, view the agenda, and register for the live sessions. Registrations are stored in DynamoDB and attendees receive a confirmation email via SES.

---

## AWS Architecture

```
Browser
  │
  ├── Static Website
  │     └── S3  ──────────────────────────  Hosts Vue.js build
  │
  └── Registration Form (POST)
        └── API Gateway  ─────────────────  HTTP REST API
              └── Lambda  ──────────────────  Node.js handler
                    ├── DynamoDB  ────────── Stores registrations
                    └── SES  ─────────────── Sends confirmation email

IAM  ──────────────────────────────────────  Role-based permissions
```

---

## Tech Stack

### Frontend
- **Vue.js 3** — Component-based UI framework
- **Vue Router 4** — Client-side routing (hash history for S3)
- **Vite** — Build tool and development server
- **Font Awesome 6** — Icon library
- **Google Fonts** — Playfair Display + Poppins

### AWS Services
- **S3** — Static website hosting
- **API Gateway** — HTTP API endpoint
- **Lambda** — Serverless backend (Node.js 20.x)
- **DynamoDB** — NoSQL database for registrant records
- **SES** — Transactional email service
- **IAM** — Role-based access control

---

## Features

- Parallax hero section with live countdown timer
- 3-page Vue Router setup: Home, Modules overview, Module detail
- Animated scroll reveal on all sections
- Interactive FAQ accordion
- Registration form with client-side validation
- Real-time form submission to AWS backend
- Duplicate email detection via DynamoDB condition expression
- Confirmation email via SES
- Fully responsive — mobile, tablet, desktop
- Active and hover states on navigation links
- Session-tabbed module browser

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Landing page with all sections |
| `/#/modules` | Modules | Session tabs with 6 module cards |
| `/#/modules/:id` | Module Detail | Full module info with sidebar |

---

## Project Structure

```
codelaunch-webinar/
│
├── public/
│   ├── hero-pic.png
│   └── speaker.png
│
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── style.css
│   │
│   ├── router/
│   │   └── index.js
│   │
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── ModulesPage.vue
│   │   └── ModuleDetail.vue
│   │
│   └── components/
│       ├── NavBar.vue
│       ├── HeroSection.vue
│       ├── CountdownTimer.vue
│       ├── StatsBar.vue
│       ├── LearnSection.vue
│       ├── SpeakerSection.vue
│       ├── AgendaSection.vue
│       ├── RegisterForm.vue
│       ├── FaqSection.vue
│       └── FooterSection.vue
│
├── README.md
├── DEPLOYMENT.md
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm
- AWS Account (Free Tier)

### Local Development

```bash
# Clone the repository
git clone https://github.com/your-username/codelaunch-webinar.git
cd codelaunch-webinar

# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:5173
```

### Environment Setup

Update the API URL in `src/components/RegisterForm.vue`:

```javascript
const API_URL = 'https://YOUR-API-ID.execute-api.ap-southeast-1.amazonaws.com/register'
```

Replace `YOUR-API-ID` with your actual AWS API Gateway invoke URL.

### Build for Production

```bash
npm run build
# Output: dist/ folder — upload contents to S3
```

---

## AWS Setup

Full step-by-step deployment instructions are in [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Overview

| Step | Service | Purpose |
|---|---|---|
| 1 | DynamoDB | Create `webinar-registrations` table |
| 2 | IAM | Create role with DynamoDB + SES access |
| 3 | SES | Verify sender email address |
| 4 | Lambda | Deploy `index.mjs` handler |
| 5 | API Gateway | Create HTTP API with POST /register route + CORS |
| 6 | Vue.js | Update API URL → `npm run build` |
| 7 | S3 | Enable static hosting → upload `dist/` |

---

## API Reference

### POST /register

Registers a new webinar attendee.

**Endpoint:**
```
POST https://YOUR-API-ID.execute-api.ap-southeast-1.amazonaws.com/register
```

**Request Body:**
```json
{
  "firstName": "Juan",
  "lastName":  "Dela Cruz",
  "email":     "juan@email.com",
  "phone":     "09123456789",
  "level":     "none",
  "source":    "fb"
}
```

**Level values:**
| Value | Description |
|---|---|
| `none` | Absolute beginner |
| `html` | Knows basic HTML |
| `htmlcss` | Comfortable with HTML and CSS |
| `js` | Has touched JavaScript |

**Responses:**

| Status | Message | Meaning |
|---|---|---|
| 200 | Registration successful! | Saved to DynamoDB |
| 400 | Missing required fields | firstName, lastName, email, or level missing |
| 409 | This email is already registered | Duplicate entry |
| 500 | Something went wrong | Server error |

---

## DynamoDB Schema

**Table:** `webinar-registrations`

| Attribute | Type | Description |
|---|---|---|
| `email` | String (PK) | Partition key — unique per registrant |
| `firstName` | String | First name |
| `lastName` | String | Last name |
| `phone` | String | Phone number (optional) |
| `level` | String | Experience level |
| `source` | String | How they heard about us |
| `createdAt` | String | ISO 8601 timestamp |

---

## Known Limitations

- SES is in Sandbox mode by default — confirmation emails only go to verified addresses. Request SES Production Access to send to any inbox.
- No admin dashboard — view registrants directly in DynamoDB console.
- Images are referenced from the S3 bucket root — ensure `hero-pic.png` and `speaker.png` are uploaded alongside the build files.

---

## Free Tier Costs

This project is designed to run entirely within the AWS Free Tier:

| Service | Free Limit | Expected Usage |
|---|---|---|
| S3 | 5 GB storage | Less than 5 MB |
| Lambda | 1M requests/month | Minimal |
| API Gateway | 1M calls/month | Minimal |
| DynamoDB | 25 GB forever | Less than 1 MB |
| SES | 3,000 emails/month | Minimal |

---

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the complete step-by-step deployment guide including all errors encountered and how they were resolved.

---

## License

MIT License — free to use, modify, and distribute.

---

## Author

Built as a portfolio project demonstrating AWS serverless architecture with a modern Vue.js frontend.
