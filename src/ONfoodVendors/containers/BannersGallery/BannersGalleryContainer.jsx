import React, { useState } from 'react'
import useBannersGallery from '../../../services/hooks/banners-gallery/useBannersGallery'
import toast from 'react-hot-toast'
import ImageUploading from '../../components/AddMenu/ImageUploading'
import { useCurrentUser } from '../../../services/hooks/profile/useCurrentUserLiveData'
import { uploadBannerImageAndSave, deleteBannerById } from '../../../services/firebase/firestore/banner.firestore'
import ReusableConfirmationDeleteModal from '../../components/common/ReusableConfirmationDeleteModal'
import BannerSkeleton from '../../components/BannersGallery/BannersSkelton'
import LazyImage from '../../components/common/LazyImg'


const BannersGalleryContainer = () => {
  
  const { data: user } = useCurrentUser()
  const vendorID = user?.id

  const { banners = [], loading, error, refetch } = useBannersGallery(vendorID || '')

  const [uploading, setUploading] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [bannerToDelete, setBannerToDelete] = useState(null)

 

  if (loading || !vendorID) return <div><BannerSkeleton /></div>
  if (error) return <div>Error loading banners: {error.message || error}</div>

  const handleImageUpload = async (file) => {
    setUploading(true)
    try {
      await uploadBannerImageAndSave({ file, user })
      refetch?.()
      toast.success('Banner uploaded successfully')
    } catch (err) {
      toast.error('Failed to upload banner: ' + (err.message || err))
    } finally {
      setUploading(false)
    }
  }

  // When user clicks delete button - open modal
  const openDeleteModal = (banner) => {
    setBannerToDelete(banner)
    setIsDeleteModalOpen(true)
  }

  // When user confirms delete in modal
  const confirmDelete = async () => {
    if (!bannerToDelete) return

    setDeletingId(bannerToDelete.id)
    setIsDeleteModalOpen(false)
    try {
      await deleteBannerById(bannerToDelete)
      toast.success('Banner deleted successfully')
      refetch?.()
    } catch (err) {
      toast.error('Failed to delete banner: ' + (err.message || err))
    } finally {
      setDeletingId(null)
      setBannerToDelete(null)
    }
  }

  // When user cancels modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setBannerToDelete(null)
  }

  return (
    <>
      <ImageUploading imageUrl={null} handleImageUpload={handleImageUpload} type={"banner"} />

      {uploading && <div className="mt-2 text-sm text-gray-600">Uploading image...</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-5 justify-start">
        {banners.map((banner, idx) => (
          <div key={`${banner.id}-${idx}`} className="relative max-w-xl rounded-md overflow-hidden  shadow-2xl ">
            <LazyImage
              src={banner.url}
              alt={banner.name || 'Banner image'}
              className="w-full h-48 object-cover block rounded-md"
            />
            <button
              className={`absolute top-2 right-2 bg-red-700/30  duration-300 hover:bg-red-800 text-white font-bold rounded-full w-7 h-7 flex items-center justify-center transition-opacity ease-in-out
                ${deletingId === banner.id ? 'opacity-60 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
              disabled={deletingId === banner.id}
              onClick={() => openDeleteModal(banner)}
              title="Delete Banner"
            >
              {deletingId === banner.id ? '...' : '✕'}
            </button>
          </div>
        ))}
      </div>

      {/* Your confirmation modal */}
      <ReusableConfirmationDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onAction={confirmDelete}
        image={bannerToDelete?.url}
        title="Delete this banner?"
        description="This action cannot be undone."
        closeText="Cancel"
        actionText="Delete"
      />
    </>
  )
}

export default BannersGalleryContainer
