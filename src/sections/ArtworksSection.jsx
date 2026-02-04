import "./ArtworksSection.css";

function ArtworksSection() {
  return (
    <section className="artworks section" id="artworks">
      <div className="section__header">
        <p className="eyebrow">Artworks</p>
        <h2>작업 아카이브</h2>
      </div>
      <div className="artworks__grid">
        <div className="artworks__card">Artwork 01</div>
        <div className="artworks__card">Artwork 02</div>
        <div className="artworks__card">Artwork 03</div>
        <div className="artworks__card">Artwork 04</div>
      </div>
    </section>
  );
}

export default ArtworksSection;
