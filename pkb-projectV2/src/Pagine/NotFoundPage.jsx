import React from "react";

import "../css/NotFoundPage.css";

export default function NotFoundPage() {
    return (
        <>
            <div class="noise"></div>
            <div class="overlay"></div>
            <div class="terminal">
                <h1>Error <span class="errorcode">404</span></h1>
                <p class="output">La pagina che stai cercando potrebbe essere stata rimossa, il suo nome è cambiato o è temporaneamente non disponibile.</p>
                <p class="output">Per favore prova a <a href="/">[ TORNARE ALLA PAGINA INIZIALE ]</a>.</p>
                <p class="output">Buona fortuna.</p>
            </div>
        </>
    )
}