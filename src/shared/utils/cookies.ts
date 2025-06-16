import type { Token } from '../api/types/user'

interface CookieOptions {
    path?: string
    expires?: Date | string
    'max-age'?: number
    domain?: string
    secure?: boolean
}

interface AuthToken {
    access_token: string | undefined
}

export const getCookie = (name: string): string | undefined => {
    const matches = document.cookie.match(
        new RegExp(
            '(?:^|; )' +
                name.replace(/([\.$?*|{}\(\\)\[\]\\\/\+^])/g, '\\$1') +
                '=([^;]*)',
        ),
    )
    return matches ? decodeURIComponent(matches[1]) : undefined
}

export const setCookie = (
    name: string,
    value: string,
    options: CookieOptions = {},
): void => {
    options = {
        path: '/',
        ...options,
    }

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString()
    }

    let updatedCookie =
        encodeURIComponent(name) + '=' + encodeURIComponent(value)

    for (const optionKey in options) {
        updatedCookie += '; ' + optionKey
        const optionValue = options[optionKey as keyof CookieOptions]
        if (optionValue !== true) {
            updatedCookie += '=' + optionValue
        }
    }

    document.cookie = updatedCookie
}

export const getAuthToken = (): AuthToken => {
    const access_token = getCookie('access_token')

    return { access_token }
}

export const setAuthToken = ({ access_token }: Token): void => {
    setCookie('access_token', access_token, { path: '/', 'max-age': 1800 })
}

export const deleteCookie = (name: string): void => {
    setCookie(name, '', {
        'max-age': -1,
    })
}
