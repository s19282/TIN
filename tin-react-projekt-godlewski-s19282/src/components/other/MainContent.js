import React from "react";
import { useTranslation } from 'react-i18next';

function MainContent() {
    const { t } = useTranslation();
    return (
        <main>
            <h2>{t('nav.main-page')}</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Proin luctus velit at feugiat dignissim. Ut nisi sapien,
                venenatis in est nec, interdum luctus magna. Donec luctus augue quis venenatis dignissim.
                Aliquam interdum mauris vel vulputate iaculis. Nunc sem lacus, blandit vel nisi sodales,
                porttitor accumsan purus. Donec porttitor, ex eu egestas efficitur,
                ante nibh fringilla velit, nec tincidunt ligula nunc convallis nisi.
                Curabitur vel lacus ligula. Vestibulum facilisis neque vitae lacus fringilla commodo.
                Donec sit amet mollis nibh. Sed orci nibh, mollis at congue non, venenatis ut quam.
                Nam semper sapien a nibh tincidunt, sed tempus elit tincidunt. Integer a porttitor nulla.
                Integer viverra massa vitae vehicula egestas.
                Sed venenatis blandit est, vel commodo enim interdum luctus.
            </p>
            <p>
                Nullam suscipit massa id nisi commodo, a dapibus libero vestibulum.
                Aenean dictum massa vel vulputate bibendum. Suspendisse ut est eros.
                Nunc rhoncus sem erat, ac iaculis mi lobortis eu. Fusce placerat,
                risus ac sodales mollis, nisl odio vulputate nibh,
                sit amet ultrices ligula felis ac ante. Praesent enim eros, facilisis ut ante in,
                dignissim placerat nulla. Vivamus a felis hendrerit, gravida nunc quis, molestie odio.
                Suspendisse commodo magna nec urna maximus dictum. Proin rhoncus egestas semper.
                Phasellus blandit, diam id feugiat ultricies, metus magna euismod tellus, sed venenatis
                ligula urna sit amet eros.
            </p>
        </main>
    )
}

export default MainContent