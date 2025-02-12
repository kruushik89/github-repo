import * as repositoryService from './repositoryService'

global.fetch = jest.fn()

const BASE_URL = 'https://api.github.com'

describe('fetchRepositories', () => {
    beforeEach(() => {
        fetch.mockClear()
    })

    it('should successfully fetch repositories', async () => {
        const mockResponse = {
            items: [
                { id: 1, name: 'repo1' },
                { id: 2, name: 'repo2' }
            ]
        }

        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockResponse)
        })

        const result = await repositoryService.fetchRepositories(1, 10)

        expect(fetch).toHaveBeenCalledWith(
            `${BASE_URL}/search/repositories?q=nodejs&per_page=10&page=1`
        )
        expect(result).toEqual(mockResponse.items)
    })

    it('should handle API errors and log the error', async () => {
        console.error = jest.fn()

        fetch.mockResolvedValueOnce({
            ok: false,
            status: 500
        })

        const result = await repositoryService.fetchRepositories(1, 10)

        expect(fetch).toHaveBeenCalledWith(
            `${BASE_URL}/search/repositories?q=nodejs&per_page=10&page=1`
        )
        expect(result).toEqual([])

        expect(console.error).toHaveBeenCalledWith(
            'Error fetching repositories:',
            expect.objectContaining({
                message: 'GitHub API error: 500'
            })
        )
    })
})

describe('fetchRepos', () => {
    beforeEach(() => {
        repositoryService.fetchRepositories = jest.fn()
    })

    afterAll(() => {
        jest.restoreAllMocks()
    })

    it('should return repositories when fetchRepositories returns result', async () => {
        const mockRepos = [
            { id: 1, name: 'repo1' },
            { id: 2, name: 'repo2' }
        ]
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ items: mockRepos })
        })

        const result = await repositoryService.fetchRepos(1)
        expect(result).toEqual(mockRepos)
    })

    it('should return an empty array when fetchRepositories throws an error', async () => {
        repositoryService.fetchRepositories.mockRejectedValueOnce(new Error('Network error'))

        const result = await repositoryService.fetchRepos(1)
        expect(result).toEqual([])
    })

    it('should return an empty array when fetchRepositories returns a falsy value', async () => {
        repositoryService.fetchRepositories.mockResolvedValueOnce(null)

        const result = await repositoryService.fetchRepos(1)
        expect(result).toEqual([])
    })
})

describe('getSavedRepositories', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('should return parsed repositories when localStorage has valid JSON data', () => {
        const mockRepos = [
            { id: 1, name: 'repo1' },
            { id: 2, name: 'repo2' }
        ]
        localStorage.setItem('github_repos', JSON.stringify(mockRepos))

        const result = repositoryService.getSavedRepositories()
        expect(result).toEqual(mockRepos)
    })

    it('should return an empty array when localStorage does not have any saved repositories', () => {
        localStorage.removeItem('github_repos')

        const result = repositoryService.getSavedRepositories()
        expect(result).toEqual([])
    })
})

describe('saveRepositories', () => {
    beforeEach(() => {
        jest.spyOn(window.localStorage.__proto__, 'getItem')
        localStorage.getItem.mockClear()
    })

    it('should save repositories in localStorage', () => {
        const repositories = [
            { id: 1, name: 'repo1' },
            { id: 2, name: 'repo2' }
        ]

        repositoryService.saveRepositories(repositories)

        const storedData = localStorage.getItem('github_repos')
        expect(storedData).toEqual(JSON.stringify(repositories))
    })
})