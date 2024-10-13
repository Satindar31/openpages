This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started
First, install the dependencies:
```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load fonts.

## Learn More
### Next.js
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
### Enviorment variables
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:` Can be obtained from clerk's dashboard.
- `CLERK_SECRET_KEY:` Can be obtained from clerk's dashboard
- `BASE_URL:` The URl the nextjs is on is on. Ex - http://localhost:3000 or https://openpages-two.vercel.app
- `NEXT_PUBLIC_GA_MEASUREMENT_ID:` Google analytics measurement ID.
- `DATABASE_URL:` Your postgress DB URI

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSatindar31%2Fopenpages&env=NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,CLERK_SECRET_KEY,BASE_URL,NEXT_PUBLIC_GA_MEASUREMENT_ID,DATABASE_URL&envDescription=Check%20README%20in%20github%20for%20description&envLink=https%3A%2F%2Fgithub.com%2Fsatindar31%2Fopenpages#environment-variables&project-name=my-blog&repository-name=my-blog&demo-title=OpenPages%20blog&demo-description=Our%20own%20blogging%20platform&demo-url=https%3A%2F%2Fopenpages.us.kg&demo-image=cdn.openpages.us.kg%2Fplaceholder.svg) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
