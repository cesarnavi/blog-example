## Getting Started

A basic blog example builded with Next.js + Typescript + TailwindCSS + MySQL + Prisma

Features:
- Responsive design 
- Dark Mode
- Offline mode
- Save posts in localStorage
- Filter posts by Title, Author and Body Content
- Add new posts 

Live demo: https://blog-example-gules-pi.vercel.app/
#### Prerequisites:
- Node.js 18 or higher
- MySQL Server installed

#### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_URL` mysql://USER:PASSWORD@HOST:PORT/DB_NAME

Steps to launch locally 
1. Clone this repo
2. Add DB_URL enviorment variable with your database credentials 
3. Run ‘npm install’ command
4. After dependencies installation, run  "npx prisma migrate dev" command
5. Run ‘npm run dev’ command
6. Go to http://localhost:3000 test it