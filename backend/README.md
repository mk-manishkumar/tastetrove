# TasteTrove Backend - Strapi CMS

A headless CMS built with Strapi for the TasteTrove recipe and pantry management application.

## 🚀 Getting Started

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```bash
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```bash
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```bash
npm run build
# or
yarn build
```

## ⚙️ Deployment

**Current Status**: ✅ **Deployed on Strapi Cloud**

This project is deployed on Strapi Cloud with the following configuration:
- **Node.js Version**: 24 (LTS)
- **Region**: Asia (Southeast)
- **Database**: PostgreSQL (managed by Strapi Cloud)
- **Auto-scaling**: Enabled
- **Backups**: Automatic daily backups

### Deploy to Strapi Cloud

To deploy to Strapi Cloud:

```bash
npm run deploy
```

This command will authenticate and deploy your project to Strapi Cloud. Follow the interactive prompts to:
1. Authenticate with your Strapi account
2. Name your project
3. Choose Node.js version and region
4. Deploy automatically

The deployment will:
- Provision a PostgreSQL database
- Set up SSL certificates
- Configure CDN for file uploads
- Enable monitoring and analytics

### Environment Variables for Strapi Cloud

When deploying to Strapi Cloud, configure these environment variables in the Strapi Cloud dashboard:

```env
NODE_ENV=production
ADMIN_JWT_SECRET=your_admin_jwt
JWT_SECRET=your_jwt_secret
API_TOKEN_SALT=your_api_token_salt
TRANSFER_TOKEN_SALT=your_transfer_token_salt
APP_KEYS=your_app_keys
```

Database connection is automatically managed by Strapi Cloud.

## 📁 Project Structure

```
backend/
├── config/             # Strapi configuration files
├── database/           # Database migrations
├── public/            # Static files and uploaded media
├── src/
│   ├── api/           # Content types and endpoints
│   │   ├── pantry-item/
│   │   ├── recipe/
│   │   └── saved-recipe/
│   ├── extensions/    # Extended plugins (users-permissions)
│   └── index.js       # Entry point
└── package.json
```

## 🔌 API Endpoints

- **Recipes**: `/api/recipes`
- **Pantry Items**: `/api/pantry-items`
- **Saved Recipes**: `/api/saved-recipes`

## 📚 Learn More

- [Strapi Cloud Documentation](https://docs.strapi.io/cloud/getting-started)
- [Strapi Deployment Guide](https://docs.strapi.io/dev-docs/deployment)
- [Strapi Documentation](https://docs.strapi.io)
- [Strapi Tutorials](https://strapi.io/tutorials)

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
