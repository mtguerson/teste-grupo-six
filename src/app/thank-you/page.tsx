import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        <CheckCircle size={80} className="text-green-500 mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Obrigado pela sua compra!
        </h1>
        <p className="text-gray-600 mb-8">
          Seu pedido foi processado com sucesso. Você receberá um e-mail de
          confirmação em breve.
        </p>

        <Link href="/">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all">
            Voltar à Página Inicial
          </button>
        </Link>
      </div>
    </div>
  )
}
