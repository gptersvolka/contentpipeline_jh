import { useState } from 'react'

function App() {
  const [targetUrl, setTargetUrl] = useState('')
  const [campaignName, setCampaignName] = useState('')
  const [generatedLinks, setGeneratedLinks] = useState([])

  const channels = [
    { name: 'Instagram', icon: '📷', source: 'instagram', medium: 'social' },
    { name: 'Threads', icon: '🧵', source: 'threads', medium: 'social' },
    { name: 'YouTube', icon: '🎥', source: 'youtube', medium: 'video' },
    { name: 'Blog', icon: '📝', source: 'blog', medium: 'seo' },
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
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('링크가 복사되었습니다!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">i</span>
            </div>
            <span className="text-lg font-semibold text-gray-700">InsightFlow</span>
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            URL이나 링크를 입력하면<br />
            <span className="text-brand-blue">AI가 다양한 콘텐츠 방향을 제안</span>합니다
          </h1>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-100">
          <div className="space-y-6">
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="https://example.com/article..."
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition text-gray-700 placeholder-gray-400"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <span className="text-xs text-gray-400">URL</span>
                </div>
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="2024_spring_event"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition text-gray-700 placeholder-gray-400"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <span className="text-xs text-gray-400">캠페인</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2 ml-1">
                영문, 숫자, 하이픈(-)만 사용 가능
              </p>
            </div>

            <button
              onClick={generateLinks}
              className="w-full bg-brand-blue text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-brand-blue-light transition duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              🔗 링크 생성하기
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            InsightFlow에서 다양한 채널에 맞는 링크를 자동 생성합니다
          </p>
        </div>

        {/* Output Section */}
        {generatedLinks.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                생성된 링크
              </h2>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {generatedLinks.length}개 채널
              </span>
            </div>
            {generatedLinks.map((link, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-200 border border-gray-100 hover:border-brand-blue/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-brand-blue-light rounded-xl flex items-center justify-center text-2xl shadow-sm">
                        {link.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold text-gray-900">
                          {link.name}
                        </h3>
                        <div className="flex gap-2 mt-1">
                          <span className="text-xs bg-blue-50 text-brand-blue px-2 py-0.5 rounded-md font-medium">
                            {link.source}
                          </span>
                          <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-md font-medium">
                            {link.medium}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <p className="text-sm text-gray-700 break-all font-mono leading-relaxed">
                        {link.url}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(link.url)}
                    className="flex-shrink-0 bg-brand-blue hover:bg-brand-blue-light text-white px-6 py-3 rounded-xl transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
