# Cars Spin Partners Portal - React Version

This is the React version of the Cars Spin Partners Portal, migrated from the original ASP.NET Web Forms application.

## Features

- Modern UI with Tailwind CSS
- Responsive design
- Multi-language support (English and Arabic)
- Partner management
- Account management
- File upload capabilities
- Payment processing
- Chart visualization

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/       # Reusable React components
├── pages/           # Page components
├── services/        # API services
├── utils/           # Utility functions
├── hooks/           # Custom React hooks
└── App.js          # Main application component
```

## Technologies Used

- React
- Tailwind CSS
- JavaScript
- React Router (for routing)
- Axios (for API calls)

## API Integration

The application will integrate with the existing backend API endpoints. The API endpoints will be configured in the `src/services/api.js` file.

## Language Support

The application supports both English and Arabic languages. Language switching will be implemented using React context.

## Styling

The application uses Tailwind CSS for styling, providing a modern and consistent look across all components.
