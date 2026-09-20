const form = document.getElementById("predictionForm");

const resultDashboard =
    document.getElementById("resultDashboard");

const riskText =
    document.getElementById("riskText");

const probabilityText =
    document.getElementById("probabilityText");

const explanation =
    document.getElementById("explanation");

const insightsList =
    document.getElementById("insightsList");

const suggestionsList =
    document.getElementById("suggestionsList");

const tryAgainButton =
    document.getElementById("tryAgainButton");

const riskCircle =
    document.querySelector(".risk-circle");

const riskDot =
    document.getElementById("riskDot");


/* =========================
   HELPER FUNCTION
========================= */

function getValue(id) {
    return document.getElementById(id).value;
}


/* =========================
   FORM SUBMISSION
========================= */

form.addEventListener("submit", async function (event) {

    event.preventDefault();


    /* GET INPUT VALUES */

    const age =
        Number(getValue("age"));

    const gender =
        getValue("gender");

    const dailyScreenTime =
        Number(
            getValue(
                "daily_screen_time_hours"
            )
        );

    const socialMediaHours =
        Number(
            getValue(
                "social_media_hours"
            )
        );

    const gamingHours =
        Number(
            getValue(
                "gaming_hours"
            )
        );

    const workStudyHours =
        Number(
            getValue(
                "work_study_hours"
            )
        );

    const sleepHours =
        Number(
            getValue(
                "sleep_hours"
            )
        );

    const notifications =
        Number(
            getValue(
                "notifications_per_day"
            )
        );

    const appOpens =
        Number(
            getValue(
                "app_opens_per_day"
            )
        );

    const weekendScreenTime =
        Number(
            getValue(
                "weekend_screen_time"
            )
        );

    const stressLevel =
        getValue("stress_level");

    const academicImpact =
        getValue(
            "academic_work_impact"
        );


    /* DATA SENT TO FLASK */

    const data = {

        age: age,

        gender: gender,

        daily_screen_time_hours:
            dailyScreenTime,

        social_media_hours:
            socialMediaHours,

        gaming_hours:
            gamingHours,

        work_study_hours:
            workStudyHours,

        sleep_hours:
            sleepHours,

        notifications_per_day:
            notifications,

        app_opens_per_day:
            appOpens,

        weekend_screen_time:
            weekendScreenTime,

        stress_level:
            stressLevel,

        academic_work_impact:
            academicImpact
    };


    try {

        /* SEND DATA TO FLASK */

        const response =
            await fetch(
                "http://127.0.0.1:5000/predict",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(data)
                }
            );


        if (!response.ok) {

            throw new Error(
                "Prediction request failed"
            );

        }


        const result =
            await response.json();


        /* =========================
           SHOW RESULT DASHBOARD
        ========================= */

        resultDashboard.classList.remove(
            "hidden"
        );


        /* =========================
           SHOW RISK
        ========================= */

        riskText.textContent =
            result.risk;


        const probability =
            Number(
                result.probability
            );


        probabilityText.textContent =
            `${probability.toFixed(1)}%`;


        /* =========================
           RISK CIRCLE
        ========================= */

        const angle =
            Math.min(
                Math.max(probability, 0),
                100
            ) * 3.6;


        riskCircle.style.setProperty(
            "--risk-angle",
            `${angle}deg`
        );


        /* =========================
           RISK DOT
        ========================= */

        riskDot.style.left =
            `${Math.min(
                Math.max(probability, 0),
                100
            )}%`;


        /* =========================
           EXPLANATION
        ========================= */

        if (result.prediction === 1) {

            explanation.textContent =
                "The model estimates a higher digital wellbeing risk based on the information provided. The result can help you reflect on screen habits, social media use, sleep and daily routines.";

        } else {

            explanation.textContent =
                "The model estimates a lower digital wellbeing risk based on the information provided. Continue maintaining balanced digital habits and healthy daily routines.";

        }


        /* =========================
           DIGITAL PROFILE
        ========================= */

        document.getElementById(
            "summaryAge"
        ).textContent =
            age;

        document.getElementById(
            "summaryGender"
        ).textContent =
            gender;

        document.getElementById(
            "summaryScreen"
        ).textContent =
            `${dailyScreenTime} hrs`;

        document.getElementById(
            "summarySocial"
        ).textContent =
            `${socialMediaHours} hrs`;

        document.getElementById(
            "summaryGaming"
        ).textContent =
            `${gamingHours} hrs`;

        document.getElementById(
            "summaryWork"
        ).textContent =
            `${workStudyHours} hrs`;

        document.getElementById(
            "summarySleep"
        ).textContent =
            `${sleepHours} hrs`;

        document.getElementById(
            "summaryStress"
        ).textContent =
            stressLevel;


        /* =========================
           WHY PREDICTION
        ========================= */

        generateInsights(
            socialMediaHours,
            dailyScreenTime,
            notifications,
            appOpens,
            sleepHours,
            stressLevel,
            academicImpact,
            weekendScreenTime,
            gamingHours
        );


        /* =========================
           SUGGESTIONS
        ========================= */

        generateSuggestions(
            socialMediaHours,
            dailyScreenTime,
            notifications,
            sleepHours,
            stressLevel,
            academicImpact
        );


        /* =========================
           SCROLL TO RESULT
        ========================= */

        setTimeout(function () {

            resultDashboard.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);


    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to connect to the Flask server. Please make sure the backend is running."
        );

    }

});


/* =========================
   INSIGHTS FUNCTION
========================= */

function generateInsights(
    socialMediaHours,
    dailyScreenTime,
    notifications,
    appOpens,
    sleepHours,
    stressLevel,
    academicImpact,
    weekendScreenTime,
    gamingHours
) {

    insightsList.innerHTML = "";


    let insights = [];


    /*
       These are descriptive rules for the UI.
       They are NOT the Random Forest's internal
       feature-importance calculations.
    */


    if (socialMediaHours >= 4) {

        insights.push({
            icon: "◎",
            title: "High social media usage",
            detail:
                `${socialMediaHours} hours per day`
        });

    }


    if (dailyScreenTime >= 8) {

        insights.push({
            icon: "▣",
            title: "High daily screen time",
            detail:
                `${dailyScreenTime} hours per day`
        });

    }


    if (notifications >= 120) {

        insights.push({
            icon: "♢",
            title: "Frequent notifications",
            detail:
                `${notifications} notifications per day`
        });

    }


    if (appOpens >= 100) {

        insights.push({
            icon: "↗",
            title: "Frequent app checking",
            detail:
                `${appOpens} app opens per day`
        });

    }


    if (sleepHours < 7) {

        insights.push({
            icon: "☾",
            title: "Lower sleep duration",
            detail:
                `${sleepHours} hours per day`
        });

    }


    if (stressLevel === "High") {

        insights.push({
            icon: "♧",
            title: "High reported stress",
            detail:
                "Stress level reported as high"
        });

    }


    if (academicImpact === "Yes") {

        insights.push({
            icon: "□",
            title: "Academic / work impact",
            detail:
                "Performance impact reported"
        });

    }


    if (weekendScreenTime >= 10) {

        insights.push({
            icon: "◷",
            title: "Higher weekend screen time",
            detail:
                `${weekendScreenTime} hours`
        });

    }


    if (gamingHours >= 3) {

        insights.push({
            icon: "◆",
            title: "Higher gaming time",
            detail:
                `${gamingHours} hours per day`
        });

    }


    /*
       If no rule is triggered,
       show a neutral message.
    */

    if (insights.length === 0) {

        insights.push({
            icon: "✓",
            title: "No major flagged input factors",
            detail:
                "The entered values did not trigger the dashboard's descriptive thresholds."
        });

    }


    /*
       Display maximum 5 insights
       so the dashboard stays clean.
    */

    insights
        .slice(0, 5)
        .forEach(function (item) {

            const div =
                document.createElement("div");

            div.className =
                "insight-item";


            div.innerHTML = `

                <div class="insight-icon">
                    ${item.icon}
                </div>

                <div class="insight-content">

                    <strong>
                        ${item.title}
                    </strong>

                    <span>
                        ${item.detail}
                    </span>

                </div>
            `;


            insightsList.appendChild(div);

        });

}


/* =========================
   SUGGESTIONS FUNCTION
========================= */

function generateSuggestions(
    socialMediaHours,
    dailyScreenTime,
    notifications,
    sleepHours,
    stressLevel,
    academicImpact
) {

    suggestionsList.innerHTML = "";


    let suggestions = [];


    if (socialMediaHours >= 4) {

        suggestions.push(
            "Consider setting a daily social-media time limit."
        );

    }


    if (dailyScreenTime >= 8) {

        suggestions.push(
            "Try adding short screen-free breaks during the day."
        );

    }


    if (notifications >= 120) {

        suggestions.push(
            "Reduce non-essential notifications to limit interruptions."
        );

    }


    if (sleepHours < 7) {

        suggestions.push(
            "Consider maintaining a consistent sleep routine."
        );

    }


    if (stressLevel === "High") {

        suggestions.push(
            "Make time for relaxing offline activities such as walking, hobbies or reading."
        );

    }


    if (academicImpact === "Yes") {

        suggestions.push(
            "Consider creating distraction-free study or work periods."
        );

    }


    if (suggestions.length === 0) {

        suggestions.push(
            "Continue maintaining balanced screen-time and offline activities."
        );

        suggestions.push(
            "Keep reviewing your digital habits regularly."
        );

    }


    suggestions
        .slice(0, 5)
        .forEach(function (suggestion) {

            const div =
                document.createElement("div");

            div.className =
                "suggestion-item";


            div.innerHTML = `

                <div class="suggestion-check">
                    ✓
                </div>

                <span>
                    ${suggestion}
                </span>
            `;


            suggestionsList.appendChild(div);

        });

}


/* =========================
   TRY AGAIN
========================= */

tryAgainButton.addEventListener(
    "click",
    function () {

        /* Hide result */

        resultDashboard.classList.add(
            "hidden"
        );


        /* Clear form */

        form.reset();


        /* Reset risk circle */

        riskCircle.style.setProperty(
            "--risk-angle",
            "0deg"
        );


        riskDot.style.left = "0%";


        /* Scroll to form */

        document.getElementById(
            "prediction"
        ).scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
);