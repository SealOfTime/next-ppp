import Image from 'next/image'

export default function GalleryItem({imgUrl}) {
    return(
        <div className="gallery__item">
            <Image 
                alt="gallery image" 
                className="gallery__image" 
                src={imgUrl}
                layout="fill" 
                placeholder='blur'
                blurDataURL='url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkOAMAANIAzr59FiYAAAAASUVORK5CYII=)'
            />
        </div>
    )
}