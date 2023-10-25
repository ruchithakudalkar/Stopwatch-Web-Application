let stopwatchInterval;
        let startTime = 0;
        let elapsedTime = 0;
        let isRunning = false;
        let lapCounter = 1;

        function formatTime(milliseconds) {
            const date = new Date(milliseconds);
            return date.toISOString().substr(11, 8) + '.' + (milliseconds % 1000);
        }

        function updateStopwatch() {
            const currentTime = new Date().getTime();
            elapsedTime = currentTime - startTime;
            document.getElementById('stopwatch').textContent = formatTime(elapsedTime);
        }

        function startStopwatch() {
            if (!isRunning) {
                startTime = new Date().getTime() - elapsedTime;
                stopwatchInterval = setInterval(updateStopwatch, 10);
                document.getElementById('start').textContent = 'Resume';
                document.getElementById('pause').disabled = false;
                document.getElementById('lap').disabled = false;
                isRunning = true;
            }
        }

        function pauseStopwatch() {
            clearInterval(stopwatchInterval);
            document.getElementById('start').textContent = 'Resume';
            document.getElementById('pause').disabled = true;
            document.getElementById('lap').disabled = true;
            isRunning = false;
        }

        function resetStopwatch() {
            clearInterval(stopwatchInterval);
            document.getElementById('start').textContent = 'Start';
            document.getElementById('pause').disabled = true;
            document.getElementById('lap').disabled = true;
            startTime = 0;
            elapsedTime = 0;
            lapCounter = 1;
            document.getElementById('stopwatch').textContent = '00:00:00.000';
            document.getElementById('lapList').innerHTML = '';
            isRunning = false;
        }

        function recordLapTime() {
            const lapTime = formatTime(elapsedTime);
            const lapItem = document.createElement('li');
            lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
            document.getElementById('lapList').appendChild(lapItem);
            lapCounter++;
        }