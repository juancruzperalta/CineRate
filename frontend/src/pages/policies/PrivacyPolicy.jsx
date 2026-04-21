import React from 'react'
import { Link } from 'react-router-dom'

export const PrivacyPolicy = () => {
  return (
    <div className='px-10 mt-20 w-full min-h-screen bg-[#090c0f] text-white py-12 flex flex-col'>
      <div className='max-w-4xl mx-auto w-full'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold mb-2'>Política de Privacidad</h1>
          <p className='text-sm text-gray-400'>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
        </div>

        {/* Content */}
        <div className='space-y-6'>
          {/* Introducción */}
          <div className='bg-[#232426c4] backdrop-blur-md border border-[#2c2d30] rounded-2xl p-6'>
            <h2 className='text-xl font-semibold mb-3'>Introducción</h2>
            <p className='text-gray-300 text-sm leading-relaxed'>
              En CineRate nos comprometemos a proteger tu privacidad. Esta política explica cómo recopilamos, utilizamos y protegemos tus datos personales cuando utilizas nuestra plataforma.
            </p>
          </div>

          {/* Datos que recopilamos */}
          <div className='bg-[#232426c4] backdrop-blur-md border border-[#2c2d30] rounded-2xl p-6'>
            <h2 className='text-xl font-semibold mb-4'>Datos que recopilamos</h2>
            <div className='space-y-4'>
              <div>
                <h3 className='font-semibold text-[#0ed395] mb-2 text-sm'>Registro e Inicio de Sesión</h3>
                <p className='text-gray-300 text-sm'>Cuando te registras e inicias sesión recopilamos: email, nombre de usuario y contraseña (encriptada).</p>
              </div>
              <div>
                <h3 className='font-semibold text-[#0ed395] mb-2 text-sm'>Datos de Uso</h3>
                <p className='text-gray-300 text-sm'>Información sobre cómo utilizas CineRate: películas vistas, calificaciones, listas personales y búsquedas.</p>
              </div>
            </div>
          </div>

          {/* Para qué utilizamos tus datos */}
          <div className='bg-[#232426c4] backdrop-blur-md border border-[#2c2d30] rounded-2xl p-6'>
            <h2 className='text-xl font-semibold mb-4'>¿Para qué utilizamos tus datos?</h2>
            <ul className='space-y-2 text-gray-300 text-sm'>
              <li>✓ <strong>Autenticación:</strong> Verificar tu identidad y mantener tu sesión segura</li>
              <li>✓ <strong>Personalización:</strong> Adaptar la experiencia según tus preferencias</li>
              <li>✓ <strong>Mejora:</strong> Analizar cómo usas CineRate para optimizar la plataforma</li>
              <li>✓ <strong>Seguridad:</strong> Detectar y prevenir fraude o actividades sospechosas</li>
            </ul>
          </div>

          {/* Tokens de Autenticación */}
          <div className='bg-[#232426c4] backdrop-blur-md border border-[#2c2d30] rounded-2xl p-6'>
            <h2 className='text-xl font-semibold mb-3'>Tokens de Autenticación</h2>
            <p className='text-gray-300 text-sm leading-relaxed mb-3'>
              Cuando inicias sesión o te registras, generamos un token de autenticación seguro. Este token se guarda en las cookies de tu navegador y se utiliza para verificar tu identidad en cada solicitud sin enviar tu contraseña.
            </p>
            <div className='bg-[#171818]/80 rounded-lg p-4 border border-[#2c2d30]'>
              <p className='text-gray-400 text-xs'>
                Los tokens se encriptan y se validan en cada request para garantizar tu seguridad. Cuando cierres sesión, el token se invalida automáticamente.
              </p>
            </div>
          </div>

          {/* Protección de datos */}
          <div className='bg-[#232426c4] backdrop-blur-md border border-[#2c2d30] rounded-2xl p-6'>
            <h2 className='text-xl font-semibold mb-4'>Protección de tus datos</h2>
            <ul className='space-y-2 text-gray-300 text-sm'>
              <li>🔒 Utilizamos encriptación HTTPS en todas las comunicaciones</li>
              <li>🔒 Las contraseñas se almacenan encriptadas y nunca en texto plano</li>
              <li>🔒 Los tokens se validan en cada solicitud para máxima seguridad</li>
            </ul>
          </div>

          {/* Tus derechos */}
          <div className='bg-[#232426c4] backdrop-blur-md border border-[#2c2d30] rounded-2xl p-6'>
            <h2 className='text-xl font-semibold mb-4'>Tus derechos</h2>
            <ul className='space-y-2 text-gray-300 text-sm'>
              <li>• <strong>Acceso:</strong> Solicitar acceso a los datos que tenemos sobre ti</li>
              <li>• <strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
              <li>• <strong>Eliminación:</strong> Solicitar la eliminación de tu cuenta y datos</li>
            </ul>
          </div>
        </div>

        {/* Footer Links */}
        <div className='mt-8 pt-6 border-t border-[#2c2d30] flex justify-between items-center'>
          <Link 
            to="/policies/cookies" 
            className='text-[#0ed395] hover:text-[#0ed395]/80 transition text-sm font-semibold'
          >
            ← Política de Cookies
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
