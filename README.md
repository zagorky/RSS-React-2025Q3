# Performance Profiling Report

## Overview
This document contains performance analysis results for the Climate Data Table application using React Dev Tools Profiler.

## Profiling Methodology
Profiling was conducted using React Dev Tools Profiler with the following settings:
- ✅ "Record why each component rendered while profiling" - Enabled
- ✅ "Hide commits below 0.1ms" - Enabled
- 🔄 Multiple iterations per test case for accurate results

## Test Scenarios

### 1. Column Sorting Interaction
**User Action**: Sort data by population

#### Flame Graph
<img width="700" alt="image" src="https://github.com/user-attachments/assets/d8c74bc8-4919-4986-aaef-2157b5c383dd" />

#### Ranked Chart
<img width="700" alt="image" src="https://github.com/user-attachments/assets/23edc81b-5b01-4835-979d-7a2554365c2f" />
---

### 2. Country Search Operation
**User Action**: Type "United" in search field

#### Flame Graph
<img width="700" alt="image" src="https://github.com/user-attachments/assets/125803a8-200f-4ed1-9ae2-6902f766ca16" />

#### Ranked Chart
<img width="700" alt="image" src="https://github.com/user-attachments/assets/d126ca41-e118-4ba2-a763-c00ac43b400f" />

---

### 3. Year Selection Change
**User Action**: Select different year from dropdown

#### Flame Graph
<img width="700" alt="image" src="https://github.com/user-attachments/assets/6a23c61a-669e-47a8-945c-dd1e9e3614f7" />

#### Ranked Chart
<img width="700" alt="image" src="https://github.com/user-attachments/assets/2dc62229-5422-416e-9d0b-4f36591845ba" />
---

### 4. Column Management
**User Action**: Open modal and toggle additional columns

#### Flame Graph
<img width="700" alt="image" src="https://github.com/user-attachments/assets/6e9c70f3-7e17-4e65-ba8a-a1f6cfe24c92" />

#### Ranked Chart
<img width="700" alt="image" src="https://github.com/user-attachments/assets/86176f65-df28-4ec1-b855-a69e03e6a6a8" />
---