// firebase-messaging-sw.js

// Import Firebase compat scripts (WAJIB pakai versi yang sesuai)
importScripts("https://www.gstatic.com/firebasejs/11.9.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.9.1/firebase-messaging-compat.js");

// Inisialisasi Firebase di service worker
firebase.initializeApp({
  apiKey: "AIzaSyAfBzoX9kUwUTWfQYT6QLndd_mP03__8Wo",
  authDomain: "vlcrave-express.firebaseapp.com",
  projectId: "vlcrave-express",
  storageBucket: "vlcrave-express.appspot.com",
  messagingSenderId: "609330453287",
  appId: "1:609330453287:web:5280b9ec5c0d435518e702"
});

const messaging = firebase.messaging();

// Handle background notifications
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification?.title || 'Notifikasi';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/icons/icon-192x192.png',
    data: {
      url: payload.data?.url || '/' // URL tujuan saat notifikasi diklik
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Event listener klik notifikasi
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

const urlToOpen = event.notification.data?.url || '/index.html';


  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (const client of windowClients) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
