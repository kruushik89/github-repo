const BASE_URL = 'https://api.github.com'

export async function fetchRepositories(page = 1, perPage = 10) {
    try {
        const response = await fetch(
            `${BASE_URL}/search/repositories?q=nodejs&per_page=${perPage}&page=${page}`
        )

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`)
        }

        const data = await response.json()
        return data.items
    } catch (error) {
        console.error('Error fetching repositories:', error)
        return []
    }
}

export async function fetchRepos(page) {
    try {
        const newRepos = await fetchRepositories(page)
        return newRepos || []
    } catch (error) {
        return []
    }
}

export function getSavedRepositories() {
    const saved = localStorage.getItem('github_repos')
    return saved ? JSON.parse(saved) : []
}

export function saveRepositories(repositories) {
    localStorage.setItem('github_repos', JSON.stringify(repositories))
}