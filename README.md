# Twitter Clone

##  Stack
- **React Native** (Expo,Clerk,Tanstack)
- **Node.js** (Express, Arcjet, Clerk)
- **MongoDB**



##  Demo
![App Demo](appsc.gif)


## Environment Variables

### backend (.env)
```bash
ARCJECT_KEY=...
CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLOUDINARY_CLOUD_NAME=...
MONGO_URI=...
NODE_ENV=...
PORT=...
```
### client (.env)
```bash
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=...
```

## Installation & Startup
### Backend
```bash
cd backend 
npm install
npm run dev
```
## Mobile 
```bash
cd mobile
npm install
npx expo
```

## Project Structure

### Backend
```bash 
backend
├── .env
└── src
    ├── config
    │   ├── arcjet.js
    │   ├── cloudinary.js
    │   ├── db.js
    │   └── env.js
    ├── controllers
    │   ├── comment.controller.js
    │   ├── notification.controller.js
    │   ├── post.controller.js
    │   └── user.controller.js
    ├── middleware
    │   ├── arcjet.middleware.js
    │   ├── auth.middleware.js
    │   └── upload.middleware.js
    ├── models
    │   ├── comment.model.js
    │   ├── notification.model.js
    │   ├── post.model.js
    │   └── user.model.js
    ├── routers
    │   ├── comment.route.js
    │   ├── notification.route.js
    │   ├── post.route.js
    │   └── user.route.js
    └── server.js
```
### Mobile
```bash
mobile
├── .env
├── app
│   ├── (auth)
│   │   ├── _layout.tsx
│   │   └── index.tsx
│   ├── (tabs)
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── messages.tsx
│   │   ├── notifications.tsx
│   │   ├── profile.tsx
│   │   └── search.tsx
│   └── _layout.tsx
├── app.json
├── assets
├── babel.config.js
├── components
│   ├── CommentsModal.tsx
│   ├── NoNotifications.tsx
│   ├── NotificationCard.tsx
│   ├── PostCard.tsx
│   ├── PostComposer.tsx
│   ├── PostList.tsx
│   └── SignOutButton.tsx
├── data
│   └── conversations.ts
├── global.css
├── hooks
│   ├── useComments.ts
│   ├── useCreatePost.ts
│   ├── useCurrentUser.ts
│   ├── useNotifications.ts
│   ├── usePosts.ts
│   ├── useSignOut.ts
│   ├── useSocialAuth.ts
│   └── useUserSync.ts
├── types
│   └── index.ts
└── utils
    ├── api.ts
    └── formatter.ts
```
