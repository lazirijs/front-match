<template>
    <div
        class="w-full h-12 flex items-center bg-v rounded-v gap-[0.375rem] sm:gap-2 md:gap-3 px-2 sm:px-3 md:px-4 py-2 border-2 smooth"
        :class="{'border-red-500 border-dashed': invalid, 'bg-opacity-70 cursor-default': loading || readonly }">
        <icon-app v-if="icon" :icon="loading ? 'svg-spinners:ring-resize' : icon" class="w-9" />
        <input dir="rtl" :autocomplete="autocomplete" :name="name || label" class="w-full placeholder:tracking-normal truncate" :readonly="readonly" @:input="emits('update', $event.target.value)"
            :value="value" :type="type" :placeholder="placeholder || 'enter text here'" :min="min" :max="max" :maxlength="maxlength" :minlength="minlength"
            :class="{ 'text-center placeholder:text-center': center, 'cursor-default': loading || readonly }" :required="required" :accessKey="accessKey" />
        <icon-app v-if="btn || (icon && center)" @click="emits('btn')" :icon="btn || center" class="w-9" />    
    </div>
</template>
  
<script setup>
defineProps({
    value: String | Number |Boolean,
    icon: String,
    type: String,
    invalid: Boolean,
    loading: Boolean,
    readonly: Boolean,
    placeholder: String,
    btn: String,
    label: String,
    name: String,
    subText: String | Boolean,
    subTextColor: String,
    minlength: String,
    maxlength: String,
    min: String,
    max: String,
    accessKey: String,
    textarea: Boolean,
    center: Boolean,
    required: Boolean,
    autocomplete: String | Boolean
});

const emits = defineEmits(["update", "btn"]);

const fliped = ['fluent:call-24-filled', 'fluent:chevron-right-12-filled'];
</script>

<style>
.holder::placeholder {
    text-align: start;
}
</style>
