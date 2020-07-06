<template>
    <div class="GameApplicationView">
        <div class="form">
            <h1>Game Application</h1>

            <fieldset>
                <h2>Language Preferences</h2>
                <p>We'll try our best to match you to your preferd languages. Choose "<strong>NEVER</strong>" to ensure that you won't be picked for that language.</p>
                <div class="languages">
                    <label>HTML</label>
                    <select>
                        <option value="never">NEVER</option>
                        <option value="bad">Bad</option>
                        <option value="good" selected>Good</option>
                        <option value="best">Best</option>
                    </select>
                    <label>CSS</label>
                    <select>
                        <option value="never">NEVER</option>
                        <option value="bad">Bad</option>
                        <option value="good" selected>Good</option>
                        <option value="best">Best</option>
                    </select>
                    <label>JS</label>
                    <select>
                        <option value="never">NEVER</option>
                        <option value="bad">Bad</option>
                        <option value="good" selected>Good</option>
                        <option value="best">Best</option>
                    </select>
                </div>
            </fieldset>

            <textarea rows="3"  placeholder="Enter message here. (optional)"></textarea>

            <div class="actions">
                <button>Apply</button>
            </div>
        </div>
    </div>
</template>


<script>
export default {

};
</script>


<style lang="scss" scoped>
.GameApplicationView {
    display: flex;
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    .form {
        display: flex;
        flex-flow: column nowrap;
        padding: 2rem;
        width: 48rem;
        background-color: var(--bg10);

        h1 {
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid var(--primary);
        }

        h2 {
            color: var(--fg20);
        }

        p {
            margin: 0.5rem 0 1rem 0;
            color: var(--fg40);
        }

        fieldset {
            margin-bottom: 2rem;
            padding: 0;
            border: none;
        }

        .languages {
            display: flex;
            align-items: center;

            select {
                height: 2.5rem;
                width: 100%;
            }

            label {
                padding: 0 1rem;
                line-height: 2.5rem;
                font-weight: 700;
                background-color: var(--bg40);

                &:not(:first-child) {
                    margin-left: 2rem;
                }
            }
        }

        .actions {
            margin-top: 1rem;
            display: flex;
            justify-content: flex-end;

            button {
                width: 6rem;
                height: 2.5rem;
                background-color: var(--primary);
            }
        }
    }
}
</style>
