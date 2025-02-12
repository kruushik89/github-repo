export function getSavedScrollPosition() {
    return parseInt(localStorage.getItem('scroll_position') || '0', 10)
}

export function saveScrollPosition(position) {
    localStorage.setItem('scroll_position', position)
}