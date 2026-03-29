import { useState, useEffect } from 'react';
import { ChevronDown, Check, ArrowRight, Phone, Brain, BarChart3, Users, Zap, Shield } from 'lucide-react';

/**
 * KairoCall Landing Page
 * Design: Modern Minimalism + Trust-Centric
 * Color: Blue (#2563EB) + Green (#10B981) + Warm Accent (#F59E0B)
 * Typography: Noto Sans KR with strategic weight variations
 */

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleElements(prev => new Set(prev).add(entry.target.id));
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 640px)');
    const updateMatch = () => setIsMobile(mediaQuery.matches);
    updateMatch();

    mediaQuery.addEventListener('change', updateMatch);
    return () => mediaQuery.removeEventListener('change', updateMatch);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setShowStickyCTA(false);
      return;
    }

    const ctaSection = document.getElementById('cta');
    if (!ctaSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyCTA(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -120px 0px',
      },
    );

    observer.observe(ctaSection);
    return () => observer.disconnect();
  }, [isMobile]);

  const handleSubmit = async (e: React.FormEvent, source: string) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://formspree.io/f/xzdkpwpv', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(e.currentTarget as HTMLFormElement),
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail('');
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const isVisible = (id: string) => visibleElements.has(id);

  return (
    <div className="min-h-screen bg-white pb-24 sm:pb-0 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-gray-900">
              Kairo<span className="text-blue-600">Call</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="#cta" className="text-sm font-semibold text-blue-600 sm:hidden">
              사전 등록
            </a>
            <a href="#cta" className="btn-primary text-xs px-4 py-2 hidden sm:inline-flex sm:text-sm sm:px-6 sm:py-3">
              사전 등록
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50/30 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div
            id="hero-badge"
            data-animate
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-8 transition-all duration-700 ${
              isVisible('hero-badge') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Phone className="w-4 h-4" />
            AI 시니어 경제 대화 서비스
          </div>

          <h1
            id="hero-title"
            data-animate
            className={`text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6 transition-all duration-700 delay-100 ${
              isVisible('hero-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            매일 아침,<br />
            <span className="gradient-text">AI가 부모님께 전화를 겁니다</span>
          </h1>

          <p
            id="hero-subtitle"
            data-animate
            className={`text-lg sm:text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible('hero-subtitle') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            경제 뉴스로 대화를 나누고, 두뇌 자극은 자연히 따라옵니다.<br />
            전화 영어처럼 — 매일, 자연스럽게.
          </p>

          {/* Email Form */}
          <div
            id="hero-form"
            data-animate
            className={`flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8 transition-all duration-700 delay-300 ${
              isVisible('hero-form') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <form
              onSubmit={(e) => handleSubmit(e, 'hero')}
              className="flex flex-col sm:flex-row gap-3 w-full"
            >
              <input
                type="email"
                name="email"
                placeholder="이메일 주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-base flex-1"
              />
              <input type="hidden" name="source" value="hero" />
              <button
                type="submit"
                disabled={loading}
                className="btn-primary whitespace-nowrap"
              >
                {loading ? '전송 중...' : '출시 알림 받기'}
              </button>
            </form>
          </div>

          {submitted && (
            <div className="text-center text-green-600 font-medium animate-fade-in">
              등록이 완료되었습니다! 출시 때 가장 먼저 연락드릴게요.
            </div>
          )}

          <p className="text-sm text-gray-500">스팸 없음 · 언제든 수신 거부 가능</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div
              id="features-label"
              data-animate
              className={`badge mb-4 justify-center transition-all duration-700 ${
                isVisible('features-label') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              서비스 소개
            </div>
            <h2
              id="features-title"
              data-animate
              className={`section-title mb-6 transition-all duration-700 delay-100 ${
                isVisible('features-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              전화 한 통으로<br />이 모든 걸 해결합니다
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                id: 'feature-1',
                icon: Phone,
                title: '경제 대화',
                desc: '오늘의 금리, 물가, 환율 뉴스를 AI가 쉬운 말로 풀어 대화를 나눕니다. 부모님은 그냥 편하게 이야기하시면 됩니다.',
                delay: 0,
              },
              {
                id: 'feature-2',
                icon: Brain,
                title: '두뇌 자극',
                desc: '계산, 기억, 판단이 자연스럽게 녹아든 대화. 검사받는 느낌 없이, 매일 아침 두뇌를 깨웁니다.',
                delay: 100,
              },
              {
                id: 'feature-3',
                icon: BarChart3,
                title: '주간 리포트',
                desc: '자녀에게 주간 대화 리포트를 발송합니다. 부모님이 잘 지내고 계신지 한눈에 확인하세요.',
                delay: 200,
              },
            ].map((feature) => (
              <div
                key={feature.id}
                id={feature.id}
                data-animate
                className={`card-base p-8 transition-all duration-700 ${
                  isVisible(feature.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${feature.delay}ms` }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            id="value-title"
            data-animate
            className={`text-4xl sm:text-5xl font-bold text-white leading-tight mb-6 transition-all duration-700 ${
              isVisible('value-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            부모님은 <span className="text-yellow-300">말벗</span>을 얻고<br />
            자녀는 <span className="text-yellow-300">안심</span>을 얻습니다
          </h2>
          <p
            id="value-subtitle"
            data-animate
            className={`text-lg sm:text-xl text-blue-100 leading-relaxed transition-all duration-700 delay-100 ${
              isVisible('value-subtitle') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            스마트폰 앱 설치 없이, 배울 것도 없이.<br />
            그냥 전화를 받으시면 됩니다.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div
              id="how-label"
              data-animate
              className={`badge mb-4 justify-center transition-all duration-700 ${
                isVisible('how-label') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              이용 방법
            </div>
            <h2
              id="how-title"
              data-animate
              className={`section-title mb-6 transition-all duration-700 delay-100 ${
                isVisible('how-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              딱 세 가지면<br />충분합니다
            </h2>
          </div>

          <div className="space-y-8">
            {[
              {
                id: 'step-1',
                num: '1',
                title: '자녀가 부모님 번호를 등록합니다',
                desc: '5분이면 충분합니다. 부모님이 직접 하실 필요 없어요.',
                delay: 0,
              },
              {
                id: 'step-2',
                num: '2',
                title: '매일 아침 AI가 전화를 겁니다',
                desc: '원하는 시간에 맞춰 AI가 먼저 전화를 드립니다. 오늘의 경제 뉴스로 자연스럽게 대화가 시작됩니다.',
                delay: 100,
              },
              {
                id: 'step-3',
                num: '3',
                title: '자녀 앱으로 리포트를 확인합니다',
                desc: '이번 주 몇 번 통화했는지, 대화가 어떠했는지 주간 리포트로 받아보세요.',
                delay: 200,
              },
            ].map((step) => (
              <div
                key={step.id}
                id={step.id}
                data-animate
                className={`flex gap-6 pb-8 border-b border-gray-200 last:border-b-0 transition-all duration-700 ${
                  isVisible(step.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${step.delay}ms` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-blue-600">{step.num}</span>
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div
              id="benefits-label"
              data-animate
              className={`badge mb-4 justify-center transition-all duration-700 ${
                isVisible('benefits-label') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              왜 KairoCall인가
            </div>
            <h2
              id="benefits-title"
              data-animate
              className={`section-title mb-6 transition-all duration-700 delay-100 ${
                isVisible('benefits-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              다른 서비스와는<br />확실히 다릅니다
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                id: 'benefit-1',
                icon: Zap,
                title: '실시간 경제 뉴스',
                desc: '매일 업데이트되는 최신 경제 정보로 항상 신선한 대화 주제를 제공합니다.',
                delay: 0,
              },
              {
                id: 'benefit-2',
                icon: Shield,
                title: '완벽한 개인정보 보호',
                desc: '모든 통화 내용은 암호화되며, 개인정보는 절대 제3자와 공유되지 않습니다.',
                delay: 100,
              },
              {
                id: 'benefit-3',
                icon: Users,
                title: '가족 중심 설계',
                desc: '자녀가 부모님의 건강 상태를 쉽게 모니터링하고 관리할 수 있습니다.',
                delay: 200,
              },
              {
                id: 'benefit-4',
                icon: Brain,
                title: '과학 기반 인지 훈련',
                desc: '인지 과학 전문가와 협력하여 설계한 대화 패턴으로 효과적인 두뇌 자극을 제공합니다.',
                delay: 300,
              },
            ].map((benefit) => (
              <div
                key={benefit.id}
                id={benefit.id}
                data-animate
                className={`card-base p-8 transition-all duration-700 ${
                  isVisible(benefit.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${benefit.delay}ms` }}
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div
              id="faq-label"
              data-animate
              className={`badge mb-4 justify-center transition-all duration-700 ${
                isVisible('faq-label') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              자주 묻는 질문
            </div>
            <h2
              id="faq-title"
              data-animate
              className={`section-title mb-6 transition-all duration-700 delay-100 ${
                isVisible('faq-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              궁금한 점을<br />해결해드립니다
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                id: 'faq-1',
                q: '부모님이 거부하면 어떻게 되나요?',
                a: '부모님이 전화를 거부하면 자동으로 재시도하지 않습니다. 부모님의 선택을 존중하며, 자녀는 앱에서 언제든 설정을 변경할 수 있습니다.',
                delay: 0,
              },
              {
                id: 'faq-2',
                q: '통화 시간은 얼마나 되나요?',
                a: '평균 5-10분 정도 진행됩니다. 부모님의 응답 속도와 관심도에 따라 자연스럽게 조절됩니다.',
                delay: 100,
              },
              {
                id: 'faq-3',
                q: '비용은 얼마인가요?',
                a: '출시 초기에는 특별한 얼리버드 가격으로 제공될 예정입니다. 사전 등록하신 분들께 우선적으로 안내해드리겠습니다.',
                delay: 200,
              },
              {
                id: 'faq-4',
                q: '데이터 보안은 어떻게 되나요?',
                a: '모든 통화 내용은 군급 암호화로 보호되며, 개인정보는 GDPR 및 국내 개인정보보호법을 완벽하게 준수합니다.',
                delay: 300,
              },
            ].map((faq) => (
              <div
                key={faq.id}
                id={faq.id}
                data-animate
                className={`card-base p-6 transition-all duration-700 ${
                  isVisible(faq.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${faq.delay}ms` }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-3">
                  <span className="text-blue-600 font-bold">Q</span>
                  {faq.q}
                </h3>
                <p className="text-gray-600 leading-relaxed flex items-start gap-3">
                  <span className="text-green-600 font-bold flex-shrink-0">A</span>
                  <span>{faq.a}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            id="cta-title"
            data-animate
            className={`text-4xl sm:text-5xl font-bold text-white leading-tight mb-6 transition-all duration-700 ${
              isVisible('cta-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            지금 사전 등록하고<br />첫 번째로 시작하세요
          </h2>

          <p
            id="cta-subtitle"
            data-animate
            className={`text-lg sm:text-xl text-blue-100 leading-relaxed mb-10 transition-all duration-700 delay-100 ${
              isVisible('cta-subtitle') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            출시 알림과 함께 얼리버드 혜택을 드립니다
          </p>

          <div
            id="cta-form"
            data-animate
            className={`flex flex-col sm:flex-row gap-3 max-w-md mx-auto transition-all duration-700 delay-200 ${
              isVisible('cta-form') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <form
              onSubmit={(e) => handleSubmit(e, 'cta')}
              className="flex flex-col sm:flex-row gap-3 w-full"
            >
              <input
                type="email"
                name="email"
                placeholder="이메일 주소"
                required
                className="input-base flex-1 bg-white/20 text-white placeholder:text-white/60 border-white/30 focus:border-white focus:ring-white/50"
              />
              <input type="hidden" name="source" value="cta" />
              <button
                type="submit"
                disabled={loading}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold transition-all duration-200 hover:bg-blue-50 active:scale-95 whitespace-nowrap"
              >
                {loading ? '전송 중...' : '무료로 시작하기'}
              </button>
            </form>
          </div>

          {submitted && (
            <div className="mt-6 text-white font-medium animate-fade-in">
              등록이 완료되었습니다! 출시 때 가장 먼저 연락드릴게요.
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-white font-bold text-lg mb-4">
                Kairo<span className="text-blue-400">Call</span>
              </div>
              <p className="text-sm leading-relaxed">
                AI 시니어 경제 대화 서비스로 부모님의 건강한 노후를 응원합니다.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">서비스</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">기능</a></li>
                <li><a href="#" className="hover:text-white transition">가격</a></li>
                <li><a href="#" className="hover:text-white transition">블로그</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">회사</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">소개</a></li>
                <li><a href="#" className="hover:text-white transition">채용</a></li>
                <li><a href="#" className="hover:text-white transition">문의</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">법률</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">개인정보처리방침</a></li>
                <li><a href="#" className="hover:text-white transition">이용약관</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2026 KairoCall · AI 시니어 경제 대화 서비스</p>
          </div>
        </div>
      </footer>

      {showStickyCTA && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-blue-100 bg-white/95 px-4 py-3 shadow-[0_-12px_30px_rgba(15,23,42,0.12)] backdrop-blur-md sm:hidden">
          <div className="flex items-center gap-3">
            <div className="text-sm font-semibold text-gray-800">
              하루 5분 통화로 부모님과 더 가까이
            </div>
            <a href="#cta" className="btn-primary w-full justify-center text-base py-3">
              사전 등록
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
