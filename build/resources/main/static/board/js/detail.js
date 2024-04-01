
window.onload = () => {
    // 게시글 상세 내용을 가져옵니다.
    const detail = document.querySelector('#detailContent').innerHTML;

    // 토스트 UI Viewer를 생성합니다.
    const viewer = new toastui.Editor({
        el: document.querySelector('#viewer'),
        viewer: true,
        initialValue: detail
    });
}