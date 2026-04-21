import React from 'react'
import { Link } from 'react-router-dom'

export const PrivacyCookies = () => {
  return (
    <div className='px-10 mt-20 w-full min-h-screen bg-[#090c0f] text-white py-12 flex flex-col'>
      <div className='max-w-4xl mx-auto w-full'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold mb-2'>Política de Cookies</h1>
          <p className='text-sm text-gray-400'>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
        </div>

        {/* Content */}
        <div className='space-y-6'>
          {/* ¿Qué son las cookies? */}
          <div className='bg-[#232426c4] backdrop-blur-md border border-[#2c2d30] rounded-2xl p-6'>
            <h2 className='text-xl font-semibold mb-3'>¿Qué son las cookies?</h2>
            <p className='text-gray-300 text-sm leading-relaxed'>
              Las cookies son pequeños archivos de texto que se almacenan en tu navegador cuando visitas CineRate. Estos archivos no contienen código malicioso y son una herramienta estándar en internet para mejorar la experiencia del usuario.
            </p>
          </div>

          {/* Cookies que utilizamos */}
          <div className='bg-[#232426c4] backdrop-blur-md border border-[#2c2d30] rounded-2xl p-6'>
            <h2 className='text-xl font-semibold mb-4'>Cookies que utilizamos</h2>
            <div className='space-y-3'>
              <div>
                <h3 className='font-semibold text-[#0ed395] mb-2 text-sm'>Cookies de Autenticación</h3>
                <p className='text-gray-300 text-sm'>
                  Almacenamos tokens de autenticación en cookies para mantener tu sesión activa. Esto permite acceder a funcionalidades personalizadas sin necesidad de iniciar sesión constantemente.
                </p>
              </div>
              <div>
                <h3 className='font-semibold text-[#0ed395] mb-2 text-sm'>Cookies Técnicas</h3>
                <p className='text-gray-300 text-sm'>
                  Utilizamos cookies técnicas para optimizar el rendimiento de la aplicación y recordar tus preferencias de navegación.
                </p>
              </div>
            </div>
          </div>

          {/* Tokens y Seguridad */}
          <div className='bg-[#232426c4] backdrop-blur-md border border-[#2c2d30] rounded-2xl p-6'>
            <h2 className='text-xl font-semibold mb-3'>Tokens de Autenticación en Cookies</h2>
            <p className='text-gray-300 text-sm leading-relaxed mb-3'>
              Los tokens de autenticación se generan cuando inicias sesión o te registras. Estos tokens se guardan de forma segura en las cookies y son necesarios para:
            </p>
            <ul className='space-y-2 text-gray-300 text-sm ml-2'>
              <li>• Verificar tu identidad en cada solicitud</li>
              <li>• Acceder a tu cuenta y datos personales</li>
              <li>• Mantener tu sesión activa y segura</li>
              <li>• Prevenir acceso no autorizado a tu cuenta</li>
            </ul>
          </div>

          {/* ¿Cómo se utilizan? */}
          <div className='bg-[#232426c4] backdrop-blur-md border border-[#2c2d30] rounded-2xl p-6'>
            <h2 className='text-xl font-semibold mb-4'>¿Cómo utilizamos las cookies?</h2>
            <ul className='space-y-2 text-gray-300 text-sm'>
              <li>✓ <strong>Autenticación:</strong> Mantener tu sesión segura después de iniciar sesión</li>
              <li>✓ <strong>Personalización:</strong> Recordar tus preferencias y configuración</li>
              <li>✓ <strong>Seguridad:</strong> Prevenir actividades fraudulentas en tu cuenta</li>
              <li>✓ <strong>Mejora:</strong> Analizar cómo usas la plataforma</li>
            </ul>
          </div>

          {/* Control de cookies */}
          <div className='bg-[#232426c4] backdrop-blur-md border border-[#2c2d30] rounded-2xl p-6'>
            <h2 className='text-xl font-semibold mb-3'>Tu control sobre las cookies</h2>
            <p className='text-gray-300 text-sm leading-relaxed'>
              Puedes controlar las cookies a través de la configuración de tu navegador. Sin embargo, si desactivas las cookies de autenticación, no podrás acceder a tu cuenta ni usar las funcionalidades personalizadas de CineRate.
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className='mt-8 pt-6 border-t border-[#2c2d30] flex justify-between items-center'>
          <Link 
            to="/policies/privacy" 
            className='text-[#0ed395] hover:text-[#0ed395]/80 transition text-sm font-semibold'
          >
            ← Política de Privacidad
          </Link>
          <Link 
            to="/" 
            className='hover:bg-white/10 transition px-4 py-2 rounded-lg text-sm font-semibold'
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
