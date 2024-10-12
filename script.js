require('dotenv').config();

const token = process.env.TOKEN;

const repoData = [
    // Framework
    {
        category: "Framework",
        name: "React",
        link: "https://github.com/facebook/react",
        description: "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    },
    {
        category: "Framework",
        name: "Vue.js (v3)",
        link: "https://github.com/vuejs/core",
        description: "Vue.js is a progressive framework for building user interfaces (v3).",
    },
    {
        category: "Framework",
        name: "Angular",
        link: "https://github.com/angular/angular",
        description: "One framework for mobile and desktop applications.",
    },
    {
        category: "Framework",
        name: "Laravel",
        link: "https://github.com/laravel/laravel",
        description: "A PHP framework for web artisans.",
    },
    {
        category: "Framework",
        name: "Django",
        link: "https://github.com/django/django",
        description: "A high-level Python Web framework that encourages rapid development.",
    },
    {
        category: "Framework",
        name: "Flask",
        link: "https://github.com/pallets/flask",
        description: "A lightweight WSGI web application framework in Python.",
    },

    // Machine Learning
    {
        category: "Machine Learning",
        name: "TensorFlow",
        link: "https://github.com/tensorflow/tensorflow",
        description: "An open-source software library for Machine Intelligence.",
    },
    {
        category: "Machine Learning",
        name: "PyTorch",
        link: "https://github.com/pytorch/pytorch",
        description: "An open-source machine learning library based on the Torch library.",
    },
    {
        category: "Machine Learning",
        name: "Scikit-learn",
        link: "https://github.com/scikit-learn/scikit-learn",
        description: "A machine learning library for Python, built on NumPy, SciPy, and Matplotlib.",
    },
    {
        category: "Machine Learning",
        name: "Keras",
        link: "https://github.com/keras-team/keras",
        description: "An open-source neural network library written in Python.",
    },
    {
        category: "Machine Learning",
        name: "XGBoost",
        link: "https://github.com/dmlc/xgboost",
        description: "An optimized distributed gradient boosting library designed to be highly efficient.",
    },

    // Version Control
    {
        category: "Version Control",
        name: "Git",
        link: "https://github.com/git/git",
        description: "Git is a free and open source distributed version control system.",
    },
    {
        category: "Version Control",
        name: "Mercurial",
        link: "https://github.com/facebookexperimental/eden",
        description: "A highly scalable distributed source control system.",
    },
    {
        category: "Version Control",
        name: "Subversion",
        link: "https://github.com/apache/subversion",
        description: "An open-source version control system that aims to be a better CVS.",
    },

    // Education
    {
        category: "Education",
        name: "freeCodeCamp",
        link: "https://github.com/freeCodeCamp/freeCodeCamp",
        description: "A community that helps you learn to code for free.",
    },
    {
        category: "Education",
        name: "The Odin Project",
        link: "https://github.com/TheOdinProject/curriculum",
        description: "A free open-source full-stack curriculum for self-taught developers.",
    },
    {
        category: "Education",
        name: "exercism",
        link: "https://github.com/exercism/exercism",
        description: "An open-source platform to solve coding exercises in various programming languages.",
    },
    {
        category: "Education",
        name: "Codecademy Curriculum",
        link: "https://github.com/Codecademy/docs",
        description: "Open-source programming documentation from Codecademy.",
    },
    {
        category: "Education",
        name: "edX",
        link: "https://github.com/edx/edx-platform",
        description: "An open-source online learning platform for higher education.",
    },

    // Software
    {
        category: "Software",
        name: "VS Code",
        link: "https://github.com/microsoft/vscode",
        description: "Open-source code editor developed by Microsoft.",
    },
    {
        category: "Software",
        name: "GIMP",
        link: "https://github.com/GNOME/gimp",
        description: "An open-source image manipulation program.",
    },
    {
        category: "Software",
        name: "Blender",
        link: "https://github.com/blender/blender",
        description: "An open-source 3D creation suite.",
    },
    {
        category: "Software",
        name: "Inkscape",
        link: "https://github.com/inkscape/inkscape",
        description: "An open-source vector graphics editor.",
    },
    {
        category: "Software",
        name: "LibreOffice",
        link: "https://github.com/LibreOffice/core",
        description: "A free and open-source office suite.",
    },

    // Development Tools
    {
        category: "Development Tools",
        name: "Docker",
        link: "https://github.com/docker/docker-ce",
        description: "An open platform for developing, shipping, and running applications in containers.",
    },
    {
        category: "Development Tools",
        name: "Homebrew",
        link: "https://github.com/Homebrew/brew",
        description: "The missing package manager for macOS (or Linux).",
    },
    {
        category: "Development Tools",
        name: "Postman",
        link: "https://github.com/postmanlabs/postman-app-support",
        description: "A platform for API development.",
    },
    {
        category: "Development Tools",
        name: "Webpack",
        link: "https://github.com/webpack/webpack",
        description: "A static module bundler for modern JavaScript applications.",
    },
    {
        category: "Development Tools",
        name: "Babel",
        link: "https://github.com/babel/babel",
        description: "A JavaScript compiler for converting ECMAScript 2015+ code into backward-compatible JavaScript.",
    },
];

function createSections() {
    const container = document.getElementById('sections-container');
    repoData.forEach(repo => {
        const section = document.createElement('div');
        section.className = 'section';
        section.innerHTML = `
            <div class="category">${repo.category}</div>
            <h2>${repo.name}</h2>
            <p>${repo.description}</p>
            <button onclick="showReadme('${repo.link}')">Show README</button>
            <button onclick="window.open('${repo.link}', '_blank')" class="link">Visit</button>
        `;
        container.appendChild(section);
    });
}

async function fetchReadme(owner, repo) {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                Accept: 'application/vnd.github.v3+json',
                Authorization: `token ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const readmeContent = atob(data.content);
        return readmeContent;

    } catch (error) {
        console.error(`Error fetching README: ${error}`);
        return `Error fetching README. You can view it [here](https://github.com/${owner}/${repo}/blob/main/README.md).`;
    }
}

function extractOwnerAndRepo(link) {
    const parts = link.split("/");
    const owner = parts[3];
    const repo = parts[4];
    return { owner, repo };
}

async function showReadme(repoLink) {
    scrollToTop();

    document.getElementById('sections-container').style.display = 'none';
    document.getElementById('readme-container').style.display = 'block';

    const { owner, repo } = extractOwnerAndRepo(repoLink);
    const readmeContent = await fetchReadme(owner, repo);

    const md = window.markdownit({
        html: true,
        linkify: true,
        typographer: true
    });

    const htmlContent = md.render(readmeContent);

    const readmeElement = document.getElementById('readme-content');
    readmeElement.innerHTML = htmlContent;

    readmeElement.style.opacity = 0;
    requestAnimationFrame(() => {
        readmeElement.style.opacity = 1;
    });
}

function hideReadme() {
    document.getElementById('sections-container').style.display = 'block';
    document.getElementById('readme-container').style.display = 'none';
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function filterResults() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        const name = section.querySelector('h2').textContent.toLowerCase();
        const category = section.querySelector('.category').textContent.toLowerCase();

        const matchesSearch = name.includes(searchInput);
        const matchesCategory = categoryFilter === "" || category === categoryFilter.toLowerCase();

        if (matchesSearch && matchesCategory) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

createSections();
