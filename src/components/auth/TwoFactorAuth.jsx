import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { toast } from 'react-toastify';

const TwoFactorAuth = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [secret, setSecret] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('initial'); // initial, setup, verify

  useEffect(() => {
    checkTwoFactorStatus();
  }, []);

  const checkTwoFactorStatus = async () => {
    try {
      // Simuler un appel API
      const response = await new Promise(resolve => 
        setTimeout(() => resolve({ enabled: false }), 1000)
      );
      setIsEnabled(response.enabled);
    } catch (error) {
      console.error('Erreur lors de la vérification du statut 2FA:', error);
      toast.error('Erreur lors de la vérification du statut 2FA');
    }
  };

  const generateSecret = async () => {
    try {
      setLoading(true);
      // Simuler un appel API pour générer un secret
      const response = await new Promise(resolve =>
        setTimeout(() => resolve({
          secret: 'JBSWY3DPEHPK3PXP',
          qrCode: 'otpauth://totp/SiteCraft:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=SiteCraft'
        }), 1000)
      );
      
      setSecret(response.secret);
      setQrCode(response.qrCode);
      setStep('setup');
    } catch (error) {
      console.error('Erreur lors de la génération du secret:', error);
      toast.error('Erreur lors de la génération du code QR');
    } finally {
      setLoading(false);
    }
  };

  const verifyAndEnable = async () => {
    if (!verificationCode) {
      toast.error('Veuillez entrer le code de vérification');
      return;
    }

    try {
      setLoading(true);
      // Simuler un appel API pour vérifier le code
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsEnabled(true);
      setStep('initial');
      toast.success('Authentification à deux facteurs activée avec succès !');
    } catch (error) {
      console.error('Erreur lors de la vérification du code:', error);
      toast.error('Code de vérification incorrect');
    } finally {
      setLoading(false);
    }
  };

  const disable2FA = async () => {
    try {
      setLoading(true);
      // Simuler un appel API pour désactiver 2FA
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsEnabled(false);
      toast.success('Authentification à deux facteurs désactivée');
    } catch (error) {
      console.error('Erreur lors de la désactivation du 2FA:', error);
      toast.error('Erreur lors de la désactivation du 2FA');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Authentification à Deux Facteurs (2FA)
      </h2>

      {step === 'initial' && (
        <div>
          <p className="text-gray-600 mb-6">
            L'authentification à deux facteurs ajoute une couche de sécurité supplémentaire à votre compte.
            Une fois activée, vous devrez entrer un code unique généré par votre application d'authentification
            en plus de votre mot de passe lors de la connexion.
          </p>

          {isEnabled ? (
            <div>
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
                L'authentification à deux facteurs est actuellement activée sur votre compte.
              </div>
              <button
                onClick={disable2FA}
                disabled={loading}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? 'Désactivation...' : 'Désactiver 2FA'}
              </button>
            </div>
          ) : (
            <button
              onClick={generateSecret}
              disabled={loading}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? 'Génération...' : 'Activer 2FA'}
            </button>
          )}
        </div>
      )}

      {step === 'setup' && (
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              1. Scannez le code QR
            </h3>
            <p className="text-gray-600 mb-4">
              Utilisez une application d'authentification comme Google Authenticator
              pour scanner ce code QR.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg inline-block">
              <QRCode value={qrCode} size={200} />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              2. Entrez le code de vérification
            </h3>
            <p className="text-gray-600 mb-4">
              Entrez le code à 6 chiffres généré par votre application d'authentification.
            </p>
            <div className="max-w-xs">
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="000000"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                maxLength={6}
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={verifyAndEnable}
              disabled={loading || verificationCode.length !== 6}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? 'Vérification...' : 'Activer 2FA'}
            </button>
            <button
              onClick={() => setStep('initial')}
              disabled={loading}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
            >
              Annuler
            </button>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-md">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">
              Important : Sauvegardez ces codes de secours
            </h4>
            <p className="text-sm text-yellow-700 mb-2">
              Si vous perdez l'accès à votre application d'authentification,
              vous pourrez utiliser ces codes pour vous connecter. Gardez-les en lieu sûr.
            </p>
            <div className="bg-white p-3 rounded font-mono text-sm">
              1234-5678-9012-3456
              <br />
              2345-6789-0123-4567
              <br />
              3456-7890-1234-5678
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TwoFactorAuth;
