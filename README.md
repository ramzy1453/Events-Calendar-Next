# Event Calendar Frontend

This is the **frontend** of the Event Calendar application, built with **Next.js** for server-side rendering (SSR) and optimized performance. Users can create rooms, manage calendars, and view scheduled events in real-time.

## 🚀 Tech Stack

- **Next.js** – for SSR and optimized performance
- **React Query** – for efficient data fetching and caching
- **Axios** – for API communication
- **Socket.io Client** – for real-time updates
- **Event Source (SSE)** – for server-sent events
- **Algorithm for calendar generation** – for generating and managing the calendar structure dynamically based on events

## 📂 Project Structure

```
frontend/
├── app/
│   ├── (home)/
│   ├── auth/
│   │   ├── login/
│   │   │   ├── page.tsx
│   │   ├── signup/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│
├── components/
│   ├── auth/
│   ├── events/
│   ├── layout/
│   ├── ui/
│   │   ├── NotificationsListener.tsx
│
├── hooks/
├── lib/
│   ├── api/
│   ├── providers/
│   ├── services/
│   ├── validation/
│   ├── utils.ts
│
└── node_modules/
```

## 🛠️ Setup & Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/ramzy1453/Next-Calendar-Events.git
   cd Calendar-Events-Backend
   ```

2. **Install dependencies**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Create a `.env.local` file** with the required environment variables:

   ```sh
    NODE_ENV=development
    NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   ```

4. **Run the development server**

   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   Visit `http://localhost:3000` to view the app.

## 📡 Real-Time Features

- Uses **Socket.io** for instant event updates
- Implements **Server-Sent Events (SSE)** for real-time notifications
- Efficient **React Query caching** for seamless experience

---

### 📌 Contributing

Feel free to submit issues or pull requests if you’d like to improve the project!

### 📄 License

This project is licensed under [MIT License](LICENSE).
