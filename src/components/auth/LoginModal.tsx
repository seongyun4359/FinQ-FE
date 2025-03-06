interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-[400px] relative shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-gray-100 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* 로그인 헤더 */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">로그인</h2>
          <p className="text-gray-600 mt-2">FinQ를 더 편리하게 이용하세요</p>
        </div>

        {/* 소셜 로그인 버튼들 */}
        <div className="space-y-4">
          {/* 구글 로그인 */}
          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
            <span className="text-gray-700">Google로 계속하기</span>
          </button>

          {/* 카카오 로그인 */}
          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#FEE500] rounded-md hover:bg-[#FDD800] transition-colors">
            <img src="/kakao-icon.svg" alt="Kakao" className="w-5 h-5" />
            <span className="text-[#000000] opacity-85">카카오로 계속하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
