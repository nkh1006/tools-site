import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "문의하기",
  description: "계산기모음에 대한 문의사항을 남겨주세요.",
};

export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">문의하기</h1>
      <p className="text-sm text-gray-500 mb-8">
        서비스 이용 중 불편사항, 오류 신고, 제안 등을 남겨주세요.
      </p>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            이름
          </label>
          <input
            type="text"
            placeholder="홍길동"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            이메일
          </label>
          <input
            type="email"
            placeholder="example@email.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            문의 유형
          </label>
          <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">선택해주세요</option>
            <option value="bug">오류 신고</option>
            <option value="suggest">기능 제안</option>
            <option value="privacy">개인정보 관련</option>
            <option value="other">기타</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            내용
          </label>
          <textarea
            rows={5}
            placeholder="문의 내용을 입력해주세요."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <button
          type="button"
          className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          문의 보내기
        </button>

        <p className="text-xs text-gray-400 text-center">
          문의 내용은 영업일 기준 1~3일 내에 이메일로 답변드립니다.
        </p>
      </div>
    </div>
  );
}
