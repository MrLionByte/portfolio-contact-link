# portfolio-contact-link

### A secure, serverless API endpoint that connects the contact form of portfolio directly to a private Discord channel.

---

## 🚀 Overview

This repository hosts the **Serverless Function** (the API bridge) that securely handles contact submissions from the main portfolio website. It ensures that the Discord Webhook URL remains hidden, preventing spam and maintaining a professional point of contact.


## ⚙️ Getting Started

Follow these steps to run the API locally and deploy it securely to Vercel.

### Prerequisites

* Node.js (LTS version)
* A Discord Webhook URL (configured in your Discord server).


### Secure Configuration (Vercel)

The Discord Webhook URL **must not** be stored in the code. It is provided via an environment variable.

1.  **On Vercel**, go to your project settings.
2.  Navigate to **Environment Variables**.
3.  Set the variable:
    * **Name:** `DISCORD_WEBHOOK_URL`
    * **Value:** `YOUR_ACTUAL_WEBHOOK_URL`
