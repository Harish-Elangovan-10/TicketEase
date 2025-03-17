<script lang="ts">
    import { sendOTP, verifyOTP } from "$lib";
    import { user } from "$lib/auth";
    import toast, { Toaster } from "svelte-french-toast";
    import { onMount } from "svelte";
    import { startLoading, stopLoading } from "$lib/pageLoading";

    let otpValues: string[] = Array(6).fill('');
    let inputRefs: HTMLInputElement[] = [];
    $:email = $user?.email ?? '';
    $:name = $user?.firstName ?? 'User';

    const handleInput = (index: number, event: Event) => {
        const input = event.target as HTMLInputElement;
        const value = input.value;

        if (!/^\d*$/.test(value)) {
            input.value = otpValues[index];
            return;
        }

        if (value.length > 1) {
            otpValues[index] = value.slice(-1);
            input.value = value.slice(-1);
        } else {
            otpValues[index] = value;
        }

        if (value && index < 5) {
            inputRefs[index + 1].focus();
        }
    };

    const handleKeyDown = (index: number, event: KeyboardEvent) => {
        if (
            !/^\d$/.test(event.key) && 
            !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(event.key)
        ) {
            event.preventDefault();
            return;
        }

        if (event.key === 'Backspace' && !otpValues[index] && index > 0) {
            inputRefs[index - 1].focus();
        }
    };

    const handlePaste = (event: ClipboardEvent) => {
        event.preventDefault();
        const copiedData = event.clipboardData?.getData('text');
        if (!copiedData) return;

        const numbers = copiedData.replace(/\D/g, '').slice(0, 6).split('');
        otpValues = [...numbers, ...Array(6 - numbers.length).fill('')];

        if (numbers.length > 0) {
            const focusIdx = Math.min(numbers.length, 5);
            inputRefs[focusIdx].focus();
            inputRefs[focusIdx].value = otpValues[focusIdx];
        }
    };

    const handleSendOTP = async () => {
        try {
            startLoading();
            await sendOTP(email, name);
            console.log("OTP sent successfully!");
            stopLoading();
        } catch (err) {
            stopLoading();
            console.error("Failed to send OTP: ", err);
        }
    };

    const handleVerifyOTP = async () => {
        const otp = otpValues.join('');
        if(otp.length !== 6) {
            toast.error('Please enter all 6 digits', {
                duration: 5000,
                style: 'border-radius: 10px; background: #222; color: #fff; padding-left: 15px; border: 2px solid #333; margin-top: 20px;',
            });
            return;
        }
        try {
            startLoading();
            const response = await verifyOTP(email, otp);
            if(response.success) {
                toast.success(response.message, {
                    duration: 5000,
                    style: 'border-radius: 10px; background: #222; color: #fff; padding-left: 15px; border: 2px solid #333; margin-top: 20px;',
                });
                stopLoading();
            } else {
                stopLoading();
                throw new Error("Invalid OTP");
            }
        } catch (err) {
            stopLoading();
            toast.error("Invalid OTP. Please try again", {
                duration: 5000,
                style: 'border-radius: 10px; background: #222; color: #fff; padding-left: 15px; border: 2px solid #333; margin-top: 20px;',
            });
        }
    };

    onMount(() => {
        stopLoading();
        // handleSendOTP();
    });
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-400 flex items-center justify-center">
    <Toaster />
    <div class="flex flex-col items-center space-y-5">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
            Enter Verification Code
        </h1>
		<h2 class="text-gray-400 pb-3">
			We've sent a code to your email address
		</h2>

        <div class="w-md bg-gradient-to-br from-gray-900 to-black rounded-xl p-8 border-[2px] border-gray-800 backdrop-blur-sm">
            <div class="flex justify-center gap-2.5 mb-8">
                {#each otpValues as value, idx}
                    <div class="input-gradient">
                        <input
						    type="text"
						    class="block w-14 h-14 text-center text-2xl rounded-lg bg-gray-900/85 hover:bg-gray-800/80 focus:bg-gray-900/90 transition-all duration-200 
                                focus:outline-none border-[2px] border-gray-800 hover:border-transparent focus-within:border-transparent caret-transparent"
                            bind:this={inputRefs[idx]}
                            value={value}
                            oninput={(e) => handleInput(idx, e)}
                            onkeydown={(e) => handleKeyDown(idx, e)}
                            onpaste={handlePaste}
                            maxlength="1"
                            inputmode="numeric"
                            pattern="[0-9]*"
						/>
                    </div>
                {/each}
            </div>

            <button 
                class="w-full py-3 px-4 rounded-xl bg-gradient-to-br from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600
                text-black font-medium focus:outline-none focus:from-teal-500 focus:to-green-500 transition-all duration-200"
                onclick={handleVerifyOTP}
            >
                Verify Code
            </button>

            <p class="place-self-center mt-6">
                Didn't receive your code? <button 
                    class="bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-600 hover:to-emerald-600 
                    bg-clip-text text-transparent"
                    onclick={handleSendOTP}
                >
                    Resend
                </button>
            </p>
        </div>
    </div>
</div>