import GalleryItem from './GalleryItem'

export default function Gallery({imgUrls}) {
    return(
        <div className="gallery">
            <GalleryItem imgUrl={imgUrls[0]}/>
            <GalleryItem imgUrl={imgUrls[1]}/>
            <GalleryItem imgUrl={imgUrls[2]}/>
        </div>
    )
}