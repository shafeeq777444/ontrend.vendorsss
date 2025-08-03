const handleDelete = async (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this user?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          // 1. Find the user doc to get image path/url
          const userDocRef = doc(db, 'users', id);
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            const data = snap.data();
            const imageUrl = data.profilePicture || data.image; // adjust field name
  
            if (imageUrl) {
              try {
                const storage = getStorage();
                let imageRef;
  
                // If you stored just the path like "users/{uid}/avatar.jpg"
                if (!imageUrl.startsWith('http')) {
                  imageRef = ref(storage, imageUrl);
                } else {
                  // If you stored a download URL, extract the path after '/o/'
                  const path = decodeURIComponent(
                    imageUrl.split('/o/')[1].split('?')[0]
                  );
                  imageRef = ref(storage, path);
                }
  
                await deleteObject(imageRef);
              } catch (imgErr) {
                console.warn('Failed to delete image:', imgErr);
                // Optional: show a warning but still continue deleting the user doc
              }
            }
          }
  
          // 2. Delete the Firestore document
          await deleteDoc(userDocRef);
          message.success('User deleted successfully');
        } catch (err) {
          console.error(err);
          message.error('Failed to delete user');
        }
      },
    });
  };