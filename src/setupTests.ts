import 'whatwg-fetch'
import '@testing-library/jest-dom/extend-expect'

import {configure} from '@testing-library/react'
import {server} from './mocks/test-server'

// Speeds up *ByRole queries a bit
// https://github.com/testing-library/dom-testing-library/issues/552
configure({defaultHidden: true})

// Enable API mocking in test runs using the same request handlers
// as for the client-side mocking.
beforeAll(() => server.listen({onUnhandledRequest: 'error'}))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())
