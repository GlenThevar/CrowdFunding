import Donation from './components/Donation'

function App() {
  return (
    <div className="max-w-5xl mx-auto p-8 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 ">
        Support This Campaign
      </h1>

      <div className="bg-white shadow-md rounded-xl p-6">
        <Donation />
      </div>
    </div>
  )
}

export default App
