print = console.log;
document.addEventListener('DOMContentLoaded', function () {
    // loadingReport();
    reportTabs();
    reporterXHR();
});

function loadingReport() {
    const loading = document.getElementById('dom-content-loader');
    loading.classList.add('hide');
}

function reportTabs() {
    const tabs = document.querySelectorAll('.r-tabs .r-tab-button');
    const contents = document.querySelectorAll('.r-tab-contents .r-tab-content');

    // DEFAULT ACTIVE
    tabs[2].classList.add('active');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', function () {
            tabs.forEach(tab => tab.classList.remove('active'));
            tabs[i].classList.add('active');

            contents.forEach(content => {
                content.classList.add('hide')
            });
            contents[i].classList.remove('hide');
        });
    }
}
function reporterXHR() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const reportLoader = document.querySelector('.r-tab-contents .report-loader');
            reportLoader.classList.add('hide');
            const data = JSON.parse(xhr.responseText);

            // REPORTS
            const tabButtons = document.querySelectorAll('.r-tab-button');
            tabButtons.forEach((button, i) => {
                const contents = document.querySelectorAll('.r-tab-contents .r-tab-content');
                if (contents[i]) {

                    // VISITORs BAR
                    const visitorsScale = contents[i].querySelector('.r-bar .visitor-vr');
                    visitorsScale.style.height = data[i].visitors_scale;
                    const visitorsBall = contents[i].querySelector('.r-bar .visitor-vr-active');
                    visitorsBall.style.bottom = data[i].visitors_scale;
                    const visitorsHovered = contents[i].querySelector('.r-bar .visitor-vr-active p');
                    visitorsHovered.textContent = "Grade " + data[i].visitors_grade;

                    // visitorCounterX
                    const visitorCounterX = contents[i].querySelector('.r-container-text .visitor-counterX');
                    visitorCounterX.textContent = data[i].visitors;

                    // visitorPercent
                    const visitorPercent = contents[i].querySelector('.r-compared-tomorrow .visitor-percent');
                    visitorPercent.textContent = data[i].visitors_compare;
                    if (visitorPercent.textContent.includes('+')) {
                        visitorPercent.style.color = '#55ff4f';
                    } else {
                        visitorPercent.style.color = '#fc5b3b';
                    }

                    // visitorGrade
                    const visitorsGrade = contents[i].querySelector('.r-upgrade-grade .visitor-grade');
                    visitorsGrade.textContent = data[i].visitors_grade;
                    if (visitorsGrade.textContent.includes('F')) {
                        visitorsGrade.style.color = '#fc5b3b';
                    }



                    // hitPost BAR
                    const hitPostScale = contents[i].querySelector('.r-bar .hit-vr');
                    hitPostScale.style.height = data[i].hitPost_scale;
                    const hitPostBall = contents[i].querySelector('.r-bar .hit-vr-active');
                    hitPostBall.style.bottom = data[i].hitPost_scale;
                    const hitPostHovered = contents[i].querySelector('.r-bar .hit-vr-active p');
                    hitPostHovered.textContent = "Grade " + data[i].hitPost_grade;


                    // hitPostCounterX
                    const hitPostCounterX = contents[i].querySelector('.r-container-text .hit-counterX');
                    hitPostCounterX.textContent = data[i].hitPost;

                    // hitPostPercent
                    const hitPostPercent = contents[i].querySelector('.r-compared-tomorrow .hit-percent');
                    hitPostPercent.textContent = data[i].hitPost_compare;
                    if (hitPostPercent.textContent.includes('+')) {
                        hitPostPercent.style.color = '#55ff4f';
                    } else {
                        hitPostPercent.style.color = '#fc5b3b';
                    }

                    // hitPostGrade
                    const hitPostsGrade = contents[i].querySelector('.r-upgrade-grade .hit-grade');
                    hitPostsGrade.textContent = data[i].hitPost_grade;
                    if (hitPostsGrade.textContent.includes('F')) {
                        hitPostsGrade.style.color = '#fc5b3b';
                    }





                    // posts BAR
                    const postsScale = contents[i].querySelector('.r-bar .posts-vr');
                    postsScale.style.height = data[i].posts_scale;
                    const postsBall = contents[i].querySelector('.r-bar .posts-vr-active');
                    postsBall.style.bottom = data[i].posts_scale;
                    const postsHovered = contents[i].querySelector('.r-bar .posts-vr-active p');
                    postsHovered.textContent = "Grade " + data[i].posts_grade;


                    // postsCounterX
                    const postsCounterX = contents[i].querySelector('.r-container-text .posts-counterX');
                    postsCounterX.textContent = data[i].posts;

                    // postsPercent
                    const postsPercent = contents[i].querySelector('.r-compared-tomorrow .posts-percent');
                    postsPercent.textContent = data[i].posts_compare;
                    if (postsPercent.textContent.includes('+')) {
                        postsPercent.style.color = '#55ff4f';
                    } else {
                        postsPercent.style.color = '#fc5b3b';
                    }

                    // postsGrade
                    const postssGrade = contents[i].querySelector('.r-upgrade-grade .posts-grade');
                    postssGrade.textContent = data[i].posts_grade;
                    if (postssGrade.textContent.includes('F')) {
                        postssGrade.style.color = '#fc5b3b';
                    }


                }
            });

            // WINNER WRITER
            function writerOfTheMonth() {
                const winnerName = document.querySelector('.winner-details .w-name p');
                winnerName.textContent = data[3][0].winner_name;
                const winnerArticles = document.getElementById('winner-total-article');
                winnerArticles.textContent = data[3][0].winner_articles;
                const winnerViews = document.getElementById('winner-total-views');
                winnerViews.textContent = data[3][0].winner_views;
                const winnerScore = document.getElementById('winner-total-score');
                winnerScore.textContent = data[3][0].winner_score;
            }
            writerOfTheMonth();

            // OTHERS WRITER
            function otherWriter() {
                const parentElement = document.querySelector('.others-writer');
                for (let i = 1; i < data[3].length; i++) {
                    const element = data[3][i];
                    const newBlock = `
                        <!-- WRITER ${i} -->
                        <div class="r-writer" title="Position ${i+1}">
                            <!-- NAME -->
                            <div class="writer-name">
                                <img src="icons/tikmark.svg" alt="">
                                <p>${element.other_writer}</p>
                            </div>
                            <!-- SCORE -->
                            <div class="writer-scores">
                                <p>Score</p>
                                <p>:</p>
                                <p>${element.score}</p>
                            </div>
                        </div>
                    `;
                    parentElement.innerHTML += newBlock;
                };
            }
            otherWriter();
        };
    };
    xhr.open('GET', 'reports.json', true);
    xhr.send();
}
