/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        host_dev: 'localhost',
        port_dev: 3306,
        user_dev: '',
        password_dev: '',
        database_dev: 'nextJS-DB'
    }
}

module.exports = nextConfig
