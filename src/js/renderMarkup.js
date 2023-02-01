export const renderMarkup = (requestData, ref) => {
  const markup = requestData
    .map(
      item =>
        `
        <div class="photo-card">
            <img src=${item.webformatURL} alt=${item.tags} loading="lazy" />
            <div class="info">
                <p class="info-item">
                    <b>Likes:</b>
                    <b>${item.likes}</b>
                </p>
                <p class="info-item">
                    <b>Views:</b>
                    <b>${item.views}</b>
                </p>
                <p class="info-item">
                    <b>Comments:</b>
                    <b>${item.comments}</b>
                </p>
                <p class="info-item">
                    <b>Downloads:</b>
                    <b>${item.downloads}</b>
                </p>
            </div>
        </div>       
        `
    )
    .join('');

  ref.insertAdjacentHTML('beforeend', markup);
};
