# TypeScript Next.js with tailwind Css and Sanity.io

This is a really simple project that shows the usage of Next.js with TypeScript. For the styling I have used Tailwind-css which is utility-first CSS framework packed with classes.
For the Backend I have used Sanity.io which is platform for structured content. It uses GROQ declarative language to query collections of largely schema-less JSON documents.we can also use thier open-source single page application Sanity Studio.
To access thier sanity studio please see url below.

## Copy Docker Image
```bash
docker pull 13singhsukh/doorsteps-tech-test_site
```

## Sanity Studio Url 

[Sanity Url](https://doorsteps-tech-test.sanity.studio/)

## functionality of Application
This is Next Js and sanity.io application. Functionality -
Home Page-
1. Add New Experiment (forms)
2. Table View of all forms
3.  Add existing Custom form and master form
4. Disable or Enable form from homepage
5. Delete Custom form, master form cannot be deleted
6. Option to Fill Form

Add Page
1. add new question
2. add experiment name and description
3. delete question if required

form/(custom-form-slug)
1. custom questions of forms
2. master form questions
3. on submit shows thank you page

form/edit/(form-Id)
1. edit question
2. edit name and description
3. add new question



## Preview

Preview the example live on [StackBlitz](http://stackblitz.com/):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/vercel/next.js/tree/canary/examples/with-typescript)

## Deployed on Vercel

[[Live Demo](https://doorsteps-techs-test.vercel.app/)]


## Notes

This example shows how to integrate the TypeScript type system into Next.js. Since TypeScript is supported out of the box with Next.js, all we have to do is to install TypeScript.

```
npm install --save-dev typescript
```

To enable TypeScript's features, we install the type declarations for React and Node.

```
npm install --save-dev @types/react @types/react-dom @types/node
```

When we run `next dev` the next time, Next.js will start looking for any `.ts` or `.tsx` files in our project and builds it. It even automatically creates a `tsconfig.json` file for our project with the recommended settings.

Next.js has built-in TypeScript declarations, so we'll get autocompletion for Next.js' modules straight away.

A `type-check` script is also added to `package.json`, which runs TypeScript's `tsc` CLI in `noEmit` mode to run type-checking separately. You can then include this, for example, in your `test` scripts.
