"use client";
import { useNotifications } from "@/hooks/useNotifications";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

const NotificationListener = () => {
  const abortControllerRef = useRef(new AbortController());
  const addNotification = useNotifications((state) => state.addNotification);

  const room = useParams().roomId;
  useEffect(() => {
    const abortController = abortControllerRef.current;
    const eventSource = new EventSource(
      `http://localhost:5000/api/v1/notifications/`
    );

    eventSource.onmessage = async function (event) {
      const notification = JSON.parse(event.data);

      const data = JSON.parse(notification.content);
      const type = notification.type;

      addNotification({ content: data, type, read: false });

      switch (notification.type) {
        case "new_event":
          toast.dismiss();
          toast.success(
            `Event ${data.name} created by ${data.user.name} in ${data.room.name}`
          );
          break;
        default:
          console.warn("Unknown notification type:", notification.type);
      }
    };

    eventSource.onerror = function (event) {
      console.error("SSE error:", event);
      eventSource.close();
    };

    return () => {
      abortController.abort();
      eventSource.close();
    };
  }, [room]);

  return null;
};

export default NotificationListener;
