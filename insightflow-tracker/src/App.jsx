import { useState } from 'react'

function App() {
  const [targetUrl, setTargetUrl] = useState('')
  const [campaignName, setCampaignName] = useState('')
  const [generatedLinks, setGeneratedLinks] = useState([])
  const [isFormCollapsed, setIsFormCollapsed] = useState(false)

  const channels = [
    { name: 'Instagram', icon: 'IG', iconColor: '#E4405F', source: 'instagram', medium: 'social' },
    { name: 'Threads', icon: '@', iconColor: '#000000', source: 'threads', medium: 'social' },
    { name: 'YouTube', icon: '▶', iconColor: '#FF0000', source: 'youtube', medium: 'video' },
    { name: 'Blog', icon: 'B', iconColor: '#6B7280', source: 'blog', medium: 'seo' },
    { name: 'Kakao', icon: '💬', iconColor: '#FEE500', source: 'kakao', medium: 'social' },
  ]

  const generateLinks = () => {
    if (!targetUrl || !campaignName) {
      alert('URL과 캠페인명을 모두 입력해주세요.')
      return
    }

    const links = channels.map(channel => {
      const separator = targetUrl.includes('?') ? '&' : '?'
      const utmParams = `utm_source=${channel.source}&utm_medium=${channel.medium}&utm_campaign=${campaignName}`
      return {
        ...channel,
        url: `${targetUrl}${separator}${utmParams}`
      }
    })

    setGeneratedLinks(links)
    setIsFormCollapsed(true)
  }

  const toggleForm = () => {
    setIsFormCollapsed(!isFormCollapsed)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('링크가 복사되었습니다!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        {!isFormCollapsed && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-brand-blue rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">i</span>
              </div>
              <span className="text-base font-semibold text-gray-700">InsightFlow</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight tracking-tight">
              지피터스 게시글 URL을 아래에 넣어주세요<br />
              <span className="text-brand-blue">채널별로 UTM 적용 링크를</span> 생성해드려요
            </h1>
          </div>
        )}

        {/* Input Section */}
        {!isFormCollapsed ? (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100">
            <div className="space-y-4">
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    placeholder="e.g https://www.gpters.org/marketing/post..."
                    className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition text-sm text-gray-700 placeholder-gray-400"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <span className="text-xs text-gray-400">URL</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    placeholder="2024_spring_event"
                    className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition text-sm text-gray-700 placeholder-gray-400"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <span className="text-xs text-gray-400">캠페인</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 ml-1">
                  영문, 숫자, 하이픈(-), 언더바(_) 사용 가능
                </p>
              </div>

              <button
                onClick={generateLinks}
                className="w-full bg-brand-blue text-white py-3 px-5 rounded-xl font-semibold text-base tracking-tight hover:bg-brand-blue-light transition duration-200 shadow-sm hover:shadow-md"
              >
                🔗 링크 생성하기
              </button>
            </div>

            <p className="text-center text-xs text-gray-400 mt-4">
              InsightFlow에서 다양한 채널에 맞는 링크를 자동 생성합니다
            </p>
          </div>
        ) : (
          <div
            onClick={toggleForm}
            className="bg-white rounded-xl shadow-sm p-4 mb-8 border border-gray-200 cursor-pointer hover:border-brand-blue hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-brand-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 mb-0.5 tracking-tight">생성된 링크 정보</p>
                    <p className="text-sm font-semibold text-gray-700 truncate tracking-tight">{targetUrl}</p>
                    <p className="text-xs text-brand-blue mt-0.5 tracking-tight font-medium">캠페인: {campaignName}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button className="text-xs text-brand-blue font-semibold tracking-tight px-2.5 py-1 rounded-lg border border-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-200">
                  다시 생성하기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Output Section */}
        {generatedLinks.length > 0 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <p className="text-lg font-bold text-gray-700 mb-2 tracking-tight">아래 링크를 복사하여 사용하세요</p>
              <p className="text-sm text-gray-500 tracking-tight">총 {generatedLinks.length}개 채널의 링크가 생성되었습니다</p>
            </div>

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                생성된 링크
              </h2>
            </div>
            {generatedLinks.map((link, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-4 hover:shadow-lg transition-all duration-200 border border-gray-100 hover:border-brand-blue/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold shadow-lg relative overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${link.iconColor}15 0%, ${link.iconColor}25 100%)`,
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          boxShadow: '0 8px 32px 0 rgba(0, 168, 232, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.4)'
                        }}
                      >
                        <span style={{ color: link.iconColor === '#FEE500' ? '#000000' : link.iconColor }}>
                          {link.icon}
                        </span>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-base font-bold text-gray-900 tracking-tight">
                          {link.name}
                        </h3>
                        <div className="flex gap-1.5 mt-0.5">
                          <span className="text-xs bg-blue-50 text-brand-blue px-1.5 py-0.5 rounded font-medium tracking-tight">
                            {link.source}
                          </span>
                          <span className="text-xs bg-green-50 text-green-600 px-1.5 py-0.5 rounded font-medium tracking-tight">
                            {link.medium}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <p className="text-xs text-gray-700 break-all font-mono leading-relaxed">
                        {link.url}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(link.url)}
                    className="flex-shrink-0 bg-brand-blue hover:bg-brand-blue-light text-white px-4 py-2 rounded-lg transition-all duration-200 font-semibold text-sm tracking-tight shadow-sm hover:shadow-md flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
