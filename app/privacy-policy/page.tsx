import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "계산기모음의 개인정보처리방침입니다.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">개인정보처리방침</h1>
      <p className="text-sm text-gray-400 mb-8">최종 수정일: 2026년 6월 25일</p>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-8 text-sm text-gray-600 leading-relaxed">

        <section>
          <h2 className="text-base font-bold text-gray-800 mb-3">1. 개요</h2>
          <p>
            계산기모음(이하 "본 사이트")은 이용자의 개인정보를 중요하게 생각하며,
            「개인정보 보호법」 등 관련 법령을 준수합니다. 본 방침은 본 사이트가
            어떤 정보를 수집하고 어떻게 사용하는지 안내합니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-800 mb-3">2. 수집하는 정보</h2>
          <p className="mb-2">본 사이트는 이용자의 개인정보를 직접 수집하지 않습니다. 다만 아래와 같은 정보가 자동으로 수집될 수 있습니다.</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>방문 페이지, 체류 시간 등 이용 통계 (Google Analytics)</li>
            <li>광고 제공을 위한 쿠키 및 관심 기반 데이터 (Google AdSense)</li>
            <li>IP 주소, 브라우저 종류, 운영체제 등 기술적 정보</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-800 mb-3">3. 쿠키(Cookie) 사용</h2>
          <p className="mb-2">
            본 사이트는 Google AdSense 광고 서비스를 통해 쿠키를 사용합니다.
            쿠키는 이용자의 브라우저에 저장되는 작은 텍스트 파일로, 광고 맞춤화에 활용됩니다.
          </p>
          <p>
            이용자는 브라우저 설정에서 쿠키 수집을 거부할 수 있습니다.
            단, 쿠키를 비활성화할 경우 일부 서비스 이용이 제한될 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-800 mb-3">4. Google AdSense</h2>
          <p className="mb-2">
            본 사이트는 Google AdSense를 통해 광고를 게재합니다.
            Google은 쿠키를 사용하여 이용자의 이전 방문 기록을 바탕으로 광고를 제공합니다.
          </p>
          <p>
            Google의 광고 및 개인정보 보호 방침에 대한 자세한 내용은{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Google 개인정보처리방침
            </a>
            에서 확인하실 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-800 mb-3">5. 제3자 링크</h2>
          <p>
            본 사이트는 외부 사이트로 연결되는 링크를 포함할 수 있습니다.
            외부 사이트의 개인정보 처리에 대해서는 본 사이트가 책임지지 않으며,
            해당 사이트의 개인정보처리방침을 확인하시기 바랍니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-800 mb-3">6. 개인정보 보호책임자</h2>
          <p>
            개인정보 처리에 관한 문의사항은{" "}
            <a href="/contact" className="text-blue-600 underline">
              문의하기
            </a>{" "}
            페이지를 통해 연락해 주시기 바랍니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-800 mb-3">7. 방침 변경</h2>
          <p>
            본 개인정보처리방침은 법령 또는 서비스 변경에 따라 수정될 수 있으며,
            변경 시 본 페이지를 통해 공지합니다.
          </p>
        </section>

      </div>
    </div>
  );
}
