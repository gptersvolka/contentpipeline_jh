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
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📘 InsightFlow Content Tracker
          </h1>
          <p className="text-gray-600">
            UTM 링크 생성 및 관리 시스템
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target URL <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://gpters.org/study"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="2024_spring_event"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition"
              />
              <p className="text-sm text-gray-500 mt-2">
                영문, 숫자, 하이픈(-)만 사용해주세요
              </p>
            </div>

            <button
              onClick={generateLinks}
              className="w-full bg-brand-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
            >
              Generate Links
            </button>
          </div>
        </div>

        {/* Output Section */}
        {generatedLinks.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              생성된 링크
            </h2>
            {generatedLinks.map((link, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <span className="text-3xl mr-3">{link.icon}</span>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {link.name}
                      </h3>
                    </div>
                    <div className="bg-gray-50 rounded p-3 mb-3">
                      <p className="text-sm text-gray-600 break-all font-mono">
                        {link.url}
                      </p>
                    </div>
                    <div className="flex gap-2 text-xs text-gray-500">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        source: {link.source}
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                        medium: {link.medium}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(link.url)}
                    className="ml-4 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition flex items-center gap-2"
                  >
                    📋 Copy
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
