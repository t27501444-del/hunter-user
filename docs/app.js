document.addEventListener("DOMContentLoaded", () => {
    // 1. URL에서 id 파라미터 값 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id') || "없음";
    
    // 화면에 ID 표시
    const userIdElement = document.getElementById("user-id");
    userIdElement.textContent = idParam;

    // 2. 접속한 링크 클립보드 복사 함수
    const currentUrl = window.location.href;
    const copyMessage = document.getElementById("copy-message");

    function copyToClipboard(text) {
        // 최신 브라우저 API 시도
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text)
                .then(() => showCopySuccess())
                .catch(() => fallbackCopy(text));
        } else {
            // 구형 또는 일부 모바일 브라우저용 대체 로직
            fallbackCopy(text);
        }
    }

    function fallbackCopy(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed"; // 화면 바깥에 숨김
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            showCopySuccess();
        } catch (err) {
            console.error('클립보드 복사 실패:', err);
        }
        document.body.removeChild(textArea);
    }

    function showCopySuccess() {
        copyMessage.classList.add("show");
        // 3초 후 복사 완료 메시지 숨김
        setTimeout(() => {
            copyMessage.classList.remove("show");
        }, 3000);
    }

    // 페이지 로드 시 즉시 복사 실행 (브라우저 정책상 사용자 인터랙션이 없으면 차단될 수 있음)
    // 안전한 실행을 위해 약간의 딜레이를 주거나 다운로드 버튼을 누를 때 한 번 더 트리거되도록 할 수 있습니다.
    copyToClipboard(currentUrl);

    // 3. 다운로드 버튼 클릭 이벤트
    const downloadBtn = document.getElementById("download-btn");
    const apkUrl = "https://github.com/t27501444-del/hunter-user/releases/download/30/hunter-user.apk";

    downloadBtn.addEventListener("click", () => {
        // 혹시 모를 로드 시점 복사 실패를 대비해 버튼 클릭 시점에 한 번 더 복사 시도
        copyToClipboard(currentUrl);
        
        // APK 다운로드 링크로 이동
        window.location.href = apkUrl;
    });
});
