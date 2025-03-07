import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaWallet, FaChartLine, FaSave } from 'react-icons/fa';

const Home = () => {
    const features = [
        {
            icon: <FaWallet className="w-8 h-8" />,
            title: 'Track Expenses',
            description: 'Monitor your daily spending with ease'
        },
        {
            icon: <FaChartLine className="w-8 h-8" />,
            title: 'Analyze Trends',
            description: 'Visualize your spending patterns'
        },
        {
            icon: <FaSave className="w-8 h-8" />,
            title: 'Save Money',
            description: 'Achieve your financial goals'
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.div
                className="hero min-h-[60vh] bg-base-200 rounded-box"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="hero-content text-center">
                    <div>
                        <h1 className="text-5xl font-bold mb-4">Welcome to Expense Tracker</h1>
                        <p className="text-xl mb-6">Take control of your finances today</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-primary btn-lg"
                        >
                            Get Started
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="card bg-base-100 shadow-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="card-body items-center text-center">
                            <div className="text-primary mb-4">{feature.icon}</div>
                            <h3 className="card-title">{feature.title}</h3>
                            <p className="text-base-content/70">{feature.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="stats shadow w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <div className="stat place-items-center">
                    <div className="stat-title">Users</div>
                    <div className="stat-value">1M+</div>
                </div>
                <div className="stat place-items-center">
                    <div className="stat-title">Tracked</div>
                    <div className="stat-value">$10M+</div>
                </div>
                <div className="stat place-items-center">
                    <div className="stat-title">Satisfaction</div>
                    <div className="stat-value">98%</div>
                </div>
            </motion.div>
        </div>
    );
};

export default Home;