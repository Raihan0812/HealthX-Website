import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Auth Context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API}/user/profile`);
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
    setLoading(false);
  };

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

// Navigation Component
const Navigation = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              HealthX
            </a>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="/" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </a>
              <a href="/presale" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Presale
              </a>
              {user ? (
                <>
                  <a href="/dashboard" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Dashboard
                  </a>
                  <button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <a href="/login" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Login
                  </a>
                  <a href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Register
                  </a>
                </>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-gray-300 focus:outline-none focus:text-gray-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/95">
              <a href="/" className="text-gray-300 hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium">
                Home
              </a>
              <a href="/presale" className="text-gray-300 hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium">
                Presale
              </a>
              {user ? (
                <>
                  <a href="/dashboard" className="text-gray-300 hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium">
                    Dashboard
                  </a>
                  <button
                    onClick={logout}
                    className="w-full text-left bg-red-600 hover:bg-red-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <a href="/login" className="text-gray-300 hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium">
                    Login
                  </a>
                  <a href="/register" className="bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium">
                    Register
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Home Page Component
const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-black"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Dive into the world of HealthX
              </span>
              <br />
              <span className="text-white">and Blockchain Technology</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Revolution in the making. Unlocking Healthcare's Potential with HealthX and Blockchain Technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/presale"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
              >
                Join Presale Now
              </a>
              <a
                href="#features"
                className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About HealthX Section */}
      <section className="py-20 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              About HealthX: Revolutionizing Global Healthcare
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
              HealthX is at the forefront of healthcare innovation, combining cutting-edge blockchain technology with practical healthcare solutions. With $2.8M in funding from industry-leading backers and partnerships with healthcare giants, we're building the future of medical services.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-black/60 backdrop-blur-sm border border-blue-500/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-blue-400 mb-6">🏥 Industry Partnerships</h3>
              <p className="text-gray-300 mb-4">
                HealthX has forged strategic collaborations with healthcare industry giants to bring blockchain solutions to traditional medical infrastructure. Our partnerships span across:
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• Major hospital networks for EHR integration</li>
                <li>• Pharmaceutical companies for supply chain transparency</li>
                <li>• Insurance providers for automated claim processing</li>
                <li>• Medical research institutions for data sharing</li>
                <li>• Telehealth platforms for secure consultations</li>
              </ul>
            </div>

            <div className="bg-black/60 backdrop-blur-sm border border-green-500/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-green-400 mb-6">💰 $2.8M Funding Raised</h3>
              <p className="text-gray-300 mb-4">
                Backed by leading venture capital firms and healthcare industry investors, HealthX has successfully raised $2.8 million in funding to accelerate our mission of revolutionizing healthcare through blockchain technology.
              </p>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-4">
                <p className="text-green-300 font-semibold">
                  This funding enables us to expand our development team, forge new partnerships, and bring innovative healthcare solutions to market faster than ever before.
                </p>
              </div>
            </div>
          </div>

          {/* HealthX Card Section */}
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl border border-purple-500/20 p-8 mb-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                💳 Introducing the HealthX Card
              </h3>
              <p className="text-xl text-gray-300">
                The world's first blockchain-powered healthcare payment card
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold text-white mb-4">🌍 Global Healthcare Utility</h4>
                <p className="text-gray-300 mb-4">
                  The HealthX Card leverages HX tokens to provide seamless healthcare payments worldwide. Whether you're purchasing medications, paying for consultations, or covering medical procedures, the HealthX Card offers:
                </p>
                <ul className="text-gray-300 space-y-2">
                  <li>• Instant global healthcare payments</li>
                  <li>• Reduced transaction fees</li>
                  <li>• Automatic insurance integration</li>
                  <li>• Secure medical data linkage</li>
                  <li>• Rewards in HX tokens for healthy behaviors</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white mb-4">🔗 Real-World Integration</h4>
                <p className="text-gray-300 mb-4">
                  Built on blockchain technology, the HealthX Card connects to our global network of healthcare providers, ensuring your medical transactions are secure, transparent, and instantly verified.
                </p>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-blue-300 font-semibold">
                    Coming Soon: Pre-order your HealthX Card during the presale and be among the first to experience the future of healthcare payments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The Marriage of Healthcare and Blockchain
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              HealthX has recognized that blockchain's core principles of transparency, security, and decentralization can be a game-changer in the healthcare sector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Secure Health Records",
                description: "Blockchain-based Electronic Health Records (EHR) systems provide patients and healthcare providers with secure and unchangeable medical history records.",
                image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0"
              },
              {
                title: "Data Privacy and Consent",
                description: "Granular control over medical data access. Patients can give explicit consent for specific healthcare providers or researchers to access their information.",
                image: "https://images.unsplash.com/photo-1576086213369-97a306d36557"
              },
              {
                title: "Drug Traceability",
                description: "Track the journey of drugs from manufacturer to patient in a secure and transparent manner, reducing counterfeit risks.",
                image: "https://images.unsplash.com/photo-1576671081837-49000212a370"
              },
              {
                title: "Streamlined Insurance",
                description: "Simplify insurance processes with smart contracts that automatically execute policies and expedite payouts when needed.",
                image: "https://images.unsplash.com/photo-1639815188546-c43c240ff4df"
              },
              {
                title: "Research & Development",
                description: "Facilitate secure sharing of anonymized patient data for medical research, accelerating medical discoveries and advancements.",
                image: "https://images.unsplash.com/photo-1576086085526-0de1930a57c7"
              },
              {
                title: "Global Payment Network",
                description: "HealthX Card enables worldwide healthcare payments using HX tokens, creating a unified global healthcare economy.",
                image: "https://images.pexels.com/photos/14911400/pexels-photo-14911400.jpeg"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-black/60 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105">
                <div className="h-48 mb-4 rounded-lg overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/30 to-cyan-900/30">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            The Future of Healthcare
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            As HealthX continues to integrate blockchain technology into healthcare, we can anticipate a healthcare system that is more patient-centric, secure, and efficient.
          </p>
          <a
            href="/presale"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 inline-block"
          >
            Join the Revolution
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-blue-500/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              HealthX
            </div>
            <p className="text-gray-400 mb-4">
              Revolutionizing healthcare through blockchain technology
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Login Component
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API}/auth/login`, {
        email,
        password
      });
      
      login(response.data.access_token, response.data.user);
      window.location.href = '/dashboard';
    } catch (error) {
      setError(error.response?.data?.detail || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <Navigation />
      <div className="max-w-md w-full mx-4">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Login to HealthX
          </h2>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <p className="text-center text-gray-400 mt-4">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-400 hover:text-blue-300">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

// Register Component
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${API}/auth/register`, {
        email: formData.email,
        password: formData.password,
        full_name: formData.fullName
      });
      
      setSuccess(true);
    } catch (error) {
      setError(error.response?.data?.detail || 'Registration failed');
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Navigation />
        <div className="max-w-md w-full mx-4">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-8 text-center">
            <div className="text-green-400 text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-green-400 mb-4">Registration Successful!</h2>
            <p className="text-gray-300 mb-6">
              Please check your email to verify your account before logging in.
            </p>
            <a
              href="/login"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
            >
              Go to Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <Navigation />
      <div className="max-w-md w-full mx-4">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Join HealthX
          </h2>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          
          <p className="text-center text-gray-400 mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-blue-400 hover:text-blue-300">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

// Presale Page Component
const PresalePage = () => {
  const { user } = useAuth();
  const [walletConnected, setWalletConnected] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState('ETH');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [calculatedTokens, setCalculatedTokens] = useState(0);

  const cryptoAddresses = {
    ETH: '0x6d17BBD5De076A5837A537caE1Ae49B07575427E',
    BNB: '0x6d17BBD5De076A5837A537caE1Ae49B07575427E',
    BTC: 'bc1qf3gq85j3fpd5wvqjmzyeqw2auvg2uelvwg9v24'
  };

  // Mock crypto prices (in production, fetch from API)
  const cryptoPrices = {
    ETH: 3500,
    BNB: 600,
    BTC: 65000
  };

  const tokenPrice = 0.005; // $0.005 per token

  useEffect(() => {
    if (paymentAmount && cryptoPrices[selectedCrypto]) {
      const usdValue = parseFloat(paymentAmount) * cryptoPrices[selectedCrypto];
      const tokens = usdValue / tokenPrice;
      setCalculatedTokens(tokens);
    } else {
      setCalculatedTokens(0);
    }
  }, [paymentAmount, selectedCrypto]);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletConnected(true);
      } else {
        alert('Please install MetaMask or another Web3 wallet');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const handlePurchase = async () => {
    if (!user) {
      alert('Please login first');
      window.location.href = '/login';
      return;
    }

    if (!walletConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!paymentAmount) {
      alert('Please enter payment amount');
      return;
    }

    try {
      const purchaseData = {
        crypto_type: selectedCrypto,
        amount_crypto: parseFloat(paymentAmount),
        amount_usd: parseFloat(paymentAmount) * cryptoPrices[selectedCrypto],
        tokens_purchased: calculatedTokens,
        wallet_address: cryptoAddresses[selectedCrypto]
      };

      const response = await axios.post(`${API}/presale/purchase`, purchaseData);
      
      alert(`Purchase recorded! Please send ${paymentAmount} ${selectedCrypto} to: ${cryptoAddresses[selectedCrypto]}`);
      
      // Reset form
      setPaymentAmount('');
      setCalculatedTokens(0);
      
    } catch (error) {
      console.error('Error recording purchase:', error);
      alert('Error recording purchase. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                🌟 HealthX (HX) Token Presale
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              Unlock Your Path to a Healthier Future! 🚀
            </p>
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-lg inline-block">
              🔥 LIMITED TIME OFFER: 20% BONUS ON YOUR INVESTMENT! 🔥
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Info Section */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-blue-400 mb-6">🚀 WHY HEALTHX?</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-green-400 mr-3">✅</span>
                  <div>
                    <strong>Revolutionizing Healthcare:</strong> HealthX is set to transform how we approach health and wellness.
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="text-green-400 mr-3">✅</span>
                  <div>
                    <strong>Blockchain-Powered Security:</strong> Our platform ensures the utmost security and transparency.
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="text-green-400 mr-3">✅</span>
                  <div>
                    <strong>Token Utility:</strong> HealthX tokens grant access to exclusive features and benefits.
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-blue-400 mt-8 mb-4">🎁 EARLY ADOPTER BENEFITS:</h3>
              <div className="space-y-2 text-gray-300">
                <p>🚀 Exclusive Access to upcoming features</p>
                <p>🌐 Community Impact contribution</p>
                <p>🤝 Be Part of Something Big</p>
              </div>
            </div>

            {/* Purchase Section */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-blue-400 mb-6">💰 Purchase Tokens</h2>
              
              {!user && (
                <div className="bg-yellow-500/20 border border-yellow-500 text-yellow-400 px-4 py-3 rounded mb-6">
                  Please <a href="/login" className="underline">login</a> to purchase tokens
                </div>
              )}

              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-bold mb-2">
                  Select Cryptocurrency
                </label>
                <select
                  value={selectedCrypto}
                  onChange={(e) => setSelectedCrypto(e.target.value)}
                  className="w-full px-3 py-2 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                >
                  <option value="ETH">Ethereum (ETH)</option>
                  <option value="BNB">Binance Coin (BNB)</option>
                  <option value="BTC">Bitcoin (BTC)</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-bold mb-2">
                  Payment Amount ({selectedCrypto})
                </label>
                <input
                  type="number"
                  step="0.001"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full px-3 py-2 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                  placeholder={`Enter ${selectedCrypto} amount`}
                />
              </div>

              {calculatedTokens > 0 && (
                <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-4 mb-6">
                  <p className="text-blue-400">
                    You will receive: <strong>{calculatedTokens.toLocaleString()} HX tokens</strong>
                  </p>
                  <p className="text-gray-300 text-sm">
                    USD Value: ${(parseFloat(paymentAmount) * cryptoPrices[selectedCrypto]).toFixed(2)}
                  </p>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-bold mb-2">
                  Payment Address
                </label>
                <div className="bg-black/50 border border-gray-600 rounded-lg p-3">
                  <code className="text-blue-400 text-sm break-all">
                    {cryptoAddresses[selectedCrypto]}
                  </code>
                </div>
              </div>

              {!walletConnected ? (
                <button
                  onClick={connectWallet}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 mb-4"
                >
                  Connect Wallet
                </button>
              ) : (
                <div className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-2 rounded mb-4">
                  ✅ Wallet Connected
                </div>
              )}

              <button
                onClick={handlePurchase}
                disabled={!user || !walletConnected || !paymentAmount}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Purchase Tokens
              </button>

              <p className="text-xs text-gray-400 mt-4">
                * After clicking purchase, send the exact amount to the address shown above
              </p>
            </div>
          </div>

          {/* Footer Info */}
          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">
              🌟 Don't Miss Out on This Limited Opportunity!
            </h3>
            <p className="text-xl text-gray-300">
              📆 Presale Stage 1: Ongoing
            </p>
            <p className="text-lg text-gray-300 mt-2">
              🚀 HealthX - Empowering Health, Transforming Lives! 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Component
const DashboardPage = () => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState([]);
  const [stats, setStats] = useState({
    totalTokens: 0,
    totalInvested: 0,
    purchaseCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPurchases();
    }
  }, [user]);

  const fetchPurchases = async () => {
    try {
      const response = await axios.get(`${API}/presale/purchases`);
      setPurchases(response.data.purchases);
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching purchases:', error);
    }
    setLoading(false);
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Welcome, {user.full_name}
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Total Tokens</h3>
              <p className="text-3xl font-bold text-blue-400">{stats.totalTokens.toLocaleString()}</p>
              <p className="text-sm text-gray-400">HX Tokens</p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Total Invested</h3>
              <p className="text-3xl font-bold text-green-400">${stats.totalInvested.toFixed(2)}</p>
              <p className="text-sm text-gray-400">USD Value</p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Purchases</h3>
              <p className="text-3xl font-bold text-purple-400">{stats.purchaseCount}</p>
              <p className="text-sm text-gray-400">Transactions</p>
            </div>
          </div>

          {/* Purchase History */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Purchase History</h2>
            
            {loading ? (
              <p className="text-gray-400">Loading...</p>
            ) : purchases.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">No purchases yet</p>
                <a
                  href="/presale"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300"
                >
                  Make Your First Purchase
                </a>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-300">Date</th>
                      <th className="text-left py-3 px-4 text-gray-300">Crypto</th>
                      <th className="text-left py-3 px-4 text-gray-300">Amount</th>
                      <th className="text-left py-3 px-4 text-gray-300">USD Value</th>
                      <th className="text-left py-3 px-4 text-gray-300">Tokens</th>
                      <th className="text-left py-3 px-4 text-gray-300">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchases.map((purchase, index) => (
                      <tr key={index} className="border-b border-gray-800">
                        <td className="py-3 px-4 text-gray-300">
                          {new Date(purchase.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-gray-300">{purchase.crypto_type}</td>
                        <td className="py-3 px-4 text-gray-300">{purchase.amount_crypto}</td>
                        <td className="py-3 px-4 text-gray-300">${purchase.amount_usd.toFixed(2)}</td>
                        <td className="py-3 px-4 text-blue-400">{purchase.tokens_purchased.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-sm">
                            Pending
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = () => {
  const [adminAuth, setAdminAuth] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (credentials.username === 'Raihan081' && credentials.password === 'Chowdhury1') {
      setAdminAuth(true);
      fetchAdminData();
    } else {
      alert('Invalid credentials');
    }
  };

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/admin/dashboard`);
      setAdminData(response.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
    setLoading(false);
  };

  if (!adminAuth) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-red-400">
              Admin Access
            </h2>
            
            <form onSubmit={handleAdminLogin}>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  className="w-full px-3 py-2 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 text-white"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="w-full px-3 py-2 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500 text-white"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
              >
                Access Admin Panel
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-red-400">Admin Dashboard</h1>
          <button
            onClick={() => setAdminAuth(false)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading admin data...</p>
        ) : adminData ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Summary Stats */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-red-400 mb-6">Platform Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Users:</span>
                  <span className="text-white font-bold">{adminData.totalUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Purchases:</span>
                  <span className="text-white font-bold">{adminData.totalPurchases}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Funds (USD):</span>
                  <span className="text-green-400 font-bold">${adminData.totalFunds?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Tokens Sold:</span>
                  <span className="text-blue-400 font-bold">{adminData.totalTokens?.toLocaleString() || '0'}</span>
                </div>
              </div>
            </div>

            {/* Recent Users */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-red-400 mb-6">Recent Users</h2>
              <div className="space-y-3">
                {adminData.recentUsers?.map((user, index) => (
                  <div key={index} className="bg-black/50 rounded-lg p-3">
                    <p className="text-white font-semibold">{user.full_name}</p>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                    <p className="text-gray-500 text-xs">
                      Joined: {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                )) || <p className="text-gray-400">No users yet</p>}
              </div>
            </div>

            {/* Recent Purchases */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-6 lg:col-span-2">
              <h2 className="text-2xl font-bold text-red-400 mb-6">Recent Purchases</h2>
              {adminData.recentPurchases?.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-300">User</th>
                        <th className="text-left py-3 px-4 text-gray-300">Crypto</th>
                        <th className="text-left py-3 px-4 text-gray-300">Amount</th>
                        <th className="text-left py-3 px-4 text-gray-300">USD Value</th>
                        <th className="text-left py-3 px-4 text-gray-300">Tokens</th>
                        <th className="text-left py-3 px-4 text-gray-300">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminData.recentPurchases.map((purchase, index) => (
                        <tr key={index} className="border-b border-gray-800">
                          <td className="py-3 px-4 text-gray-300">{purchase.user_email}</td>
                          <td className="py-3 px-4 text-gray-300">{purchase.crypto_type}</td>
                          <td className="py-3 px-4 text-gray-300">{purchase.amount_crypto}</td>
                          <td className="py-3 px-4 text-gray-300">${purchase.amount_usd?.toFixed(2)}</td>
                          <td className="py-3 px-4 text-blue-400">{purchase.tokens_purchased?.toLocaleString()}</td>
                          <td className="py-3 px-4 text-gray-300">
                            {new Date(purchase.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-400">No purchases yet</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-400">Failed to load admin data</p>
        )}
      </div>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" />;
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/presale" element={<PresalePage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route path="/admin-secret-dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;