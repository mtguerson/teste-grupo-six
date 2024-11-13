import { getVideoData } from '@/api/get-video-data'
import { ProductCard } from '@/components/product-card'

export default async function Home() {
  const video = await getVideoData()

  let videoUrl = video.object[0]?.video_url || ''
  if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
    const videoId = videoUrl.split('v=')[1] || videoUrl.split('/').pop()
    videoUrl = `https://www.youtube.com/embed/${videoId}`
  }

  const headline = video.object[0]?.video_headline || 'Título do Vídeo'
  const subheadline =
    video.object[0]?.video_sub_headline || 'Subtítulo do Vídeo'

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 py-12">
      <div className="flex flex-col items-center justify-center px-6 md:px-44 gap-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          {headline}
        </h1>
        <p className="text-lg text-gray-600 text-center">{subheadline}</p>

        {videoUrl && (
          <div className="w-full max-w-4xl aspect-w-16 aspect-h-9">
            <iframe
              src={videoUrl}
              title="Video"
              className="w-full h-full rounded-lg shadow-lg"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 w-full">
          {video.object.map((object) =>
            object.products.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            )),
          )}
        </div>
      </div>
    </div>
  )
}
