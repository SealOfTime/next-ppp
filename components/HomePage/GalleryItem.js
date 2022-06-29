export default function GalleryItem({imgUrl}) {
    return(
        <div className="gallery__item">
            <img className="gallery__image" src={imgUrl} alt="gallery image" />
        </div>
    )
}