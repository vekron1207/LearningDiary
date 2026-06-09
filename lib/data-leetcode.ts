import type { Phase, Resource } from './types';

export const LC_PHASES: Phase[] = [
  {
    id: 'lc-arrays',
    label: 'Arrays & Hashing',
    weeks: 'Pattern 01',
    theme: 'success',
    sections: [
      {
        id: 'lc-arr-s',
        title: 'Arrays & Hashing',
        week: '9 problems · NeetCode 150',
        items: [
          {
            id: 'lc-arr-1', text: '#217 Contains Duplicate', tag: 'easy',
            url: 'https://leetcode.com/problems/contains-duplicate/',
            note: 'HashSet — O(n) time, O(n) space',
            solutions: {
              python: `# O(n) time, O(n) space
def containsDuplicate(nums: list[int]) -> bool:
    return len(nums) != len(set(nums))`,
              java: `// O(n) time, O(n) space
public boolean containsDuplicate(int[] nums) {
    Set<Integer> seen = new HashSet<>();
    for (int n : nums) {
        if (!seen.add(n)) return true;
    }
    return false;
}`,
              javascript: `// O(n) time, O(n) space
function containsDuplicate(nums) {
    return new Set(nums).size !== nums.length;
}`,
            },
          },
          {
            id: 'lc-arr-2', text: '#242 Valid Anagram', tag: 'easy',
            url: 'https://leetcode.com/problems/valid-anagram/',
            note: 'Count chars with HashMap or sorted strings',
            solutions: {
              python: `# O(n) time, O(1) space (26 letters)
from collections import Counter

def isAnagram(s: str, t: str) -> bool:
    return Counter(s) == Counter(t)`,
              java: `// O(n) time, O(1) space — int[26] count array
public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    int[] count = new int[26];
    for (char c : s.toCharArray()) count[c - 'a']++;
    for (char c : t.toCharArray()) {
        if (--count[c - 'a'] < 0) return false;
    }
    return true;
}`,
              javascript: `// O(n) time, O(1) space
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - 97]++;
        count[t.charCodeAt(i) - 97]--;
    }
    return count.every(c => c === 0);
}`,
            },
          },
          {
            id: 'lc-arr-3', text: '#1 Two Sum', tag: 'easy',
            url: 'https://leetcode.com/problems/two-sum/',
            note: 'HashMap: store complement → index',
            solutions: {
              python: `# O(n) time, O(n) space
def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target - n], i]
        seen[n] = i`,
              java: `// O(n) time, O(n) space
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int comp = target - nums[i];
        if (map.containsKey(comp)) return new int[]{map.get(comp), i};
        map.put(nums[i], i);
    }
    return new int[]{};
}`,
              javascript: `// O(n) time, O(n) space
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const comp = target - nums[i];
        if (map.has(comp)) return [map.get(comp), i];
        map.set(nums[i], i);
    }
}`,
            },
          },
          {
            id: 'lc-arr-4', text: '#49 Group Anagrams', tag: 'medium',
            url: 'https://leetcode.com/problems/group-anagrams/',
            note: 'Key = sorted string or char count array',
            solutions: {
              python: `# O(n·k·log k) time, O(n·k) space
from collections import defaultdict

def groupAnagrams(strs: list[str]) -> list[list[str]]:
    d = defaultdict(list)
    for s in strs:
        d[tuple(sorted(s))].append(s)
    return list(d.values())`,
              java: `// O(n·k·log k) time
public List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> map = new HashMap<>();
    for (String s : strs) {
        char[] chars = s.toCharArray();
        Arrays.sort(chars);
        String key = new String(chars);
        map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
    }
    return new ArrayList<>(map.values());
}`,
              javascript: `// O(n·k·log k) time
function groupAnagrams(strs) {
    const map = new Map();
    for (const s of strs) {
        const key = [...s].sort().join('');
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(s);
    }
    return [...map.values()];
}`,
            },
          },
          {
            id: 'lc-arr-5', text: '#347 Top K Frequent Elements', tag: 'medium',
            url: 'https://leetcode.com/problems/top-k-frequent-elements/',
            note: 'Bucket sort by frequency — O(n)',
            solutions: {
              python: `# O(n) time — bucket sort by frequency
from collections import Counter

def topKFrequent(nums: list[int], k: int) -> list[int]:
    count = Counter(nums)
    freq = [[] for _ in range(len(nums) + 1)]
    for n, c in count.items():
        freq[c].append(n)
    res = []
    for i in range(len(freq) - 1, 0, -1):
        for n in freq[i]:
            res.append(n)
            if len(res) == k:
                return res`,
              java: `// O(n) time — bucket sort by frequency
@SuppressWarnings("unchecked")
public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> count = new HashMap<>();
    for (int n : nums) count.merge(n, 1, Integer::sum);
    List<Integer>[] freq = new List[nums.length + 1];
    for (int n : count.keySet()) {
        int f = count.get(n);
        if (freq[f] == null) freq[f] = new ArrayList<>();
        freq[f].add(n);
    }
    int[] res = new int[k];
    int idx = 0;
    for (int i = freq.length - 1; i >= 0 && idx < k; i--) {
        if (freq[i] != null)
            for (int n : freq[i]) { res[idx++] = n; if (idx == k) break; }
    }
    return res;
}`,
              javascript: `// O(n) time — bucket sort by frequency
function topKFrequent(nums, k) {
    const count = new Map();
    for (const n of nums) count.set(n, (count.get(n) || 0) + 1);
    const freq = Array.from({ length: nums.length + 1 }, () => []);
    for (const [n, c] of count) freq[c].push(n);
    const res = [];
    for (let i = freq.length - 1; i >= 0 && res.length < k; i--)
        res.push(...freq[i]);
    return res.slice(0, k);
}`,
            },
          },
          {
            id: 'lc-arr-6', text: '#238 Product of Array Except Self', tag: 'medium',
            url: 'https://leetcode.com/problems/product-of-array-except-self/',
            note: 'Prefix products × suffix products, no division',
            solutions: {
              python: `# O(n) time, O(1) extra space (output array excluded)
def productExceptSelf(nums: list[int]) -> list[int]:
    n = len(nums)
    res = [1] * n
    prefix = 1
    for i in range(n):
        res[i] = prefix
        prefix *= nums[i]
    suffix = 1
    for i in range(n - 1, -1, -1):
        res[i] *= suffix
        suffix *= nums[i]
    return res`,
              java: `// O(n) time, O(1) extra space
public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] res = new int[n];
    Arrays.fill(res, 1);
    int prefix = 1;
    for (int i = 0; i < n; i++) { res[i] = prefix; prefix *= nums[i]; }
    int suffix = 1;
    for (int i = n - 1; i >= 0; i--) { res[i] *= suffix; suffix *= nums[i]; }
    return res;
}`,
              javascript: `// O(n) time, O(1) extra space
function productExceptSelf(nums) {
    const res = new Array(nums.length).fill(1);
    let prefix = 1;
    for (let i = 0; i < nums.length; i++) { res[i] = prefix; prefix *= nums[i]; }
    let suffix = 1;
    for (let i = nums.length - 1; i >= 0; i--) { res[i] *= suffix; suffix *= nums[i]; }
    return res;
}`,
            },
          },
          {
            id: 'lc-arr-7', text: '#36 Valid Sudoku', tag: 'medium',
            url: 'https://leetcode.com/problems/valid-sudoku/',
            note: 'HashSet per row, col, box (box = (r/3)*3 + c/3)',
            solutions: {
              python: `# O(81) time and space
from collections import defaultdict

def isValidSudoku(board: list[list[str]]) -> bool:
    rows = defaultdict(set)
    cols = defaultdict(set)
    boxes = defaultdict(set)
    for r in range(9):
        for c in range(9):
            v = board[r][c]
            if v == '.':
                continue
            b = (r // 3, c // 3)
            if v in rows[r] or v in cols[c] or v in boxes[b]:
                return False
            rows[r].add(v)
            cols[c].add(v)
            boxes[b].add(v)
    return True`,
              java: `// O(81) time — compound string keys in one HashSet
public boolean isValidSudoku(char[][] board) {
    Set<String> seen = new HashSet<>();
    for (int r = 0; r < 9; r++) {
        for (int c = 0; c < 9; c++) {
            char v = board[r][c];
            if (v == '.') continue;
            if (!seen.add(v + " r" + r) ||
                !seen.add(v + " c" + c) ||
                !seen.add(v + " b" + (r/3) + (c/3)))
                return false;
        }
    }
    return true;
}`,
              javascript: `// O(81) time
function isValidSudoku(board) {
    const seen = new Set();
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const v = board[r][c];
            if (v === '.') continue;
            const row = \`r\${r}\${v}\`, col = \`c\${c}\${v}\`, box = \`b\${r/3|0}\${c/3|0}\${v}\`;
            if (seen.has(row) || seen.has(col) || seen.has(box)) return false;
            seen.add(row); seen.add(col); seen.add(box);
        }
    }
    return true;
}`,
            },
          },
          {
            id: 'lc-arr-8', text: '#271 Encode and Decode Strings', tag: 'medium',
            url: 'https://leetcode.com/problems/encode-and-decode-strings/',
            note: 'Length-prefix encoding: "4#word"',
            solutions: {
              python: `# O(n) encode and decode — length-prefix protocol
def encode(strs: list[str]) -> str:
    return ''.join(f'{len(s)}#{s}' for s in strs)

def decode(s: str) -> list[str]:
    res, i = [], 0
    while i < len(s):
        j = s.index('#', i)
        n = int(s[i:j])
        res.append(s[j + 1:j + 1 + n])
        i = j + 1 + n
    return res`,
              java: `// O(n) encode and decode — length-prefix protocol
public String encode(List<String> strs) {
    StringBuilder sb = new StringBuilder();
    for (String s : strs) sb.append(s.length()).append('#').append(s);
    return sb.toString();
}

public List<String> decode(String s) {
    List<String> res = new ArrayList<>();
    int i = 0;
    while (i < s.length()) {
        int j = s.indexOf('#', i);
        int len = Integer.parseInt(s.substring(i, j));
        res.add(s.substring(j + 1, j + 1 + len));
        i = j + 1 + len;
    }
    return res;
}`,
              javascript: `// O(n) encode and decode — length-prefix protocol
function encode(strs) {
    return strs.map(s => \`\${s.length}#\${s}\`).join('');
}

function decode(s) {
    const res = [];
    let i = 0;
    while (i < s.length) {
        const j = s.indexOf('#', i);
        const len = Number(s.slice(i, j));
        res.push(s.slice(j + 1, j + 1 + len));
        i = j + 1 + len;
    }
    return res;
}`,
            },
          },
          {
            id: 'lc-arr-9', text: '#128 Longest Consecutive Sequence', tag: 'medium',
            url: 'https://leetcode.com/problems/longest-consecutive-sequence/',
            note: 'HashSet, only start counting at sequence starts',
            solutions: {
              python: `# O(n) time, O(n) space
def longestConsecutive(nums: list[int]) -> int:
    s, best = set(nums), 0
    for n in s:
        if n - 1 not in s:          # only start at sequence head
            length = 1
            while n + length in s:
                length += 1
            best = max(best, length)
    return best`,
              java: `// O(n) time, O(n) space
public int longestConsecutive(int[] nums) {
    Set<Integer> set = new HashSet<>();
    for (int n : nums) set.add(n);
    int best = 0;
    for (int n : set) {
        if (!set.contains(n - 1)) {  // sequence start
            int length = 1;
            while (set.contains(n + length)) length++;
            best = Math.max(best, length);
        }
    }
    return best;
}`,
              javascript: `// O(n) time, O(n) space
function longestConsecutive(nums) {
    const s = new Set(nums);
    let best = 0;
    for (const n of s) {
        if (!s.has(n - 1)) {
            let length = 1;
            while (s.has(n + length)) length++;
            best = Math.max(best, length);
        }
    }
    return best;
}`,
            },
          },
        ],
      },
    ],
  },
  {
    id: 'lc-twoptr',
    label: 'Two Pointers',
    weeks: 'Pattern 02',
    theme: 'success',
    sections: [
      {
        id: 'lc-tp-s',
        title: 'Two Pointers',
        week: '5 problems · NeetCode 150',
        items: [
          {
            id: 'lc-tp-1', text: '#125 Valid Palindrome', tag: 'easy',
            url: 'https://leetcode.com/problems/valid-palindrome/',
            note: 'Left/right pointers, skip non-alphanumeric',
            solutions: {
              python: `# O(n) time, O(1) space
def isPalindrome(s: str) -> bool:
    l, r = 0, len(s) - 1
    while l < r:
        while l < r and not s[l].isalnum(): l += 1
        while l < r and not s[r].isalnum(): r -= 1
        if s[l].lower() != s[r].lower():
            return False
        l += 1; r -= 1
    return True`,
              java: `// O(n) time, O(1) space
public boolean isPalindrome(String s) {
    int l = 0, r = s.length() - 1;
    while (l < r) {
        while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;
        while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;
        if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r)))
            return false;
        l++; r--;
    }
    return true;
}`,
              javascript: `// O(n) time, O(1) space
function isPalindrome(s) {
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    let l = 0, r = s.length - 1;
    while (l < r) {
        if (s[l++] !== s[r--]) return false;
    }
    return true;
}`,
            },
          },
          {
            id: 'lc-tp-2', text: '#167 Two Sum II — Input Array Is Sorted', tag: 'medium',
            url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
            note: 'Sorted array: shrink window based on sum',
            solutions: {
              python: `# O(n) time, O(1) space
def twoSum(numbers: list[int], target: int) -> list[int]:
    l, r = 0, len(numbers) - 1
    while l < r:
        s = numbers[l] + numbers[r]
        if s == target:
            return [l + 1, r + 1]
        elif s < target:
            l += 1
        else:
            r -= 1`,
              java: `// O(n) time, O(1) space
public int[] twoSum(int[] numbers, int target) {
    int l = 0, r = numbers.length - 1;
    while (l < r) {
        int sum = numbers[l] + numbers[r];
        if (sum == target) return new int[]{l + 1, r + 1};
        else if (sum < target) l++;
        else r--;
    }
    return new int[]{};
}`,
              javascript: `// O(n) time, O(1) space
function twoSum(numbers, target) {
    let l = 0, r = numbers.length - 1;
    while (l < r) {
        const sum = numbers[l] + numbers[r];
        if (sum === target) return [l + 1, r + 1];
        else if (sum < target) l++;
        else r--;
    }
}`,
            },
          },
          {
            id: 'lc-tp-3', text: '#15 3Sum', tag: 'medium',
            url: 'https://leetcode.com/problems/3sum/',
            note: 'Sort + fix one, two-pointer for other two; skip duplicates',
            solutions: {
              python: `# O(n²) time, O(1) extra space
def threeSum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    res = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        l, r = i + 1, len(nums) - 1
        while l < r:
            s = nums[i] + nums[l] + nums[r]
            if s == 0:
                res.append([nums[i], nums[l], nums[r]])
                l += 1
                while l < r and nums[l] == nums[l - 1]: l += 1
            elif s < 0:
                l += 1
            else:
                r -= 1
    return res`,
              java: `// O(n²) time, O(1) extra space
public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> res = new ArrayList<>();
    for (int i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int l = i + 1, r = nums.length - 1;
        while (l < r) {
            int sum = nums[i] + nums[l] + nums[r];
            if (sum == 0) {
                res.add(Arrays.asList(nums[i], nums[l], nums[r]));
                l++;
                while (l < r && nums[l] == nums[l - 1]) l++;
            } else if (sum < 0) l++;
            else r--;
        }
    }
    return res;
}`,
              javascript: `// O(n²) time, O(1) extra space
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const res = [];
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        let l = i + 1, r = nums.length - 1;
        while (l < r) {
            const sum = nums[i] + nums[l] + nums[r];
            if (sum === 0) {
                res.push([nums[i], nums[l], nums[r]]);
                l++;
                while (l < r && nums[l] === nums[l - 1]) l++;
            } else if (sum < 0) l++;
            else r--;
        }
    }
    return res;
}`,
            },
          },
          {
            id: 'lc-tp-4', text: '#11 Container With Most Water', tag: 'medium',
            url: 'https://leetcode.com/problems/container-with-most-water/',
            note: 'Move the shorter wall inward',
            solutions: {
              python: `# O(n) time, O(1) space
def maxArea(height: list[int]) -> int:
    l, r, res = 0, len(height) - 1, 0
    while l < r:
        res = max(res, min(height[l], height[r]) * (r - l))
        if height[l] < height[r]:
            l += 1
        else:
            r -= 1
    return res`,
              java: `// O(n) time, O(1) space
public int maxArea(int[] height) {
    int l = 0, r = height.length - 1, res = 0;
    while (l < r) {
        res = Math.max(res, Math.min(height[l], height[r]) * (r - l));
        if (height[l] < height[r]) l++;
        else r--;
    }
    return res;
}`,
              javascript: `// O(n) time, O(1) space
function maxArea(height) {
    let l = 0, r = height.length - 1, res = 0;
    while (l < r) {
        res = Math.max(res, Math.min(height[l], height[r]) * (r - l));
        if (height[l] < height[r]) l++;
        else r--;
    }
    return res;
}`,
            },
          },
          {
            id: 'lc-tp-5', text: '#42 Trapping Rain Water', tag: 'hard',
            url: 'https://leetcode.com/problems/trapping-rain-water/',
            note: 'min(maxLeft, maxRight) - height[i]; two-pointer O(n)',
            solutions: {
              python: `# O(n) time, O(1) space — two-pointer approach
def trap(height: list[int]) -> int:
    l, r = 0, len(height) - 1
    maxL, maxR, res = height[l], height[r], 0
    while l < r:
        if maxL <= maxR:
            l += 1
            maxL = max(maxL, height[l])
            res += maxL - height[l]
        else:
            r -= 1
            maxR = max(maxR, height[r])
            res += maxR - height[r]
    return res`,
              java: `// O(n) time, O(1) space
public int trap(int[] height) {
    int l = 0, r = height.length - 1;
    int maxL = height[l], maxR = height[r], res = 0;
    while (l < r) {
        if (maxL <= maxR) {
            l++;
            maxL = Math.max(maxL, height[l]);
            res += maxL - height[l];
        } else {
            r--;
            maxR = Math.max(maxR, height[r]);
            res += maxR - height[r];
        }
    }
    return res;
}`,
              javascript: `// O(n) time, O(1) space
function trap(height) {
    let l = 0, r = height.length - 1;
    let maxL = height[l], maxR = height[r], res = 0;
    while (l < r) {
        if (maxL <= maxR) {
            l++;
            maxL = Math.max(maxL, height[l]);
            res += maxL - height[l];
        } else {
            r--;
            maxR = Math.max(maxR, height[r]);
            res += maxR - height[r];
        }
    }
    return res;
}`,
            },
          },
        ],
      },
    ],
  },
  {
    id: 'lc-sliding',
    label: 'Sliding Window',
    weeks: 'Pattern 03',
    theme: 'success',
    sections: [
      {
        id: 'lc-sw-s',
        title: 'Sliding Window',
        week: '6 problems · NeetCode 150',
        items: [
          {
            id: 'lc-sw-1', text: '#121 Best Time to Buy and Sell Stock', tag: 'easy',
            url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
            note: 'Track min price seen, max profit = price - minSeen',
            solutions: {
              python: `# O(n) time, O(1) space
def maxProfit(prices: list[int]) -> int:
    min_price, res = prices[0], 0
    for p in prices:
        res = max(res, p - min_price)
        min_price = min(min_price, p)
    return res`,
              java: `// O(n) time, O(1) space
public int maxProfit(int[] prices) {
    int minPrice = prices[0], res = 0;
    for (int p : prices) {
        res = Math.max(res, p - minPrice);
        minPrice = Math.min(minPrice, p);
    }
    return res;
}`,
              javascript: `// O(n) time, O(1) space
function maxProfit(prices) {
    let minPrice = prices[0], res = 0;
    for (const p of prices) {
        res = Math.max(res, p - minPrice);
        minPrice = Math.min(minPrice, p);
    }
    return res;
}`,
            },
          },
          {
            id: 'lc-sw-2', text: '#3 Longest Substring Without Repeating Characters', tag: 'medium',
            url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
            note: 'HashSet + shrink left when duplicate found',
            solutions: {
              python: `# O(n) time, O(min(n,m)) space
def lengthOfLongestSubstring(s: str) -> int:
    seen = {}
    l = res = 0
    for r, c in enumerate(s):
        if c in seen and seen[c] >= l:
            l = seen[c] + 1
        seen[c] = r
        res = max(res, r - l + 1)
    return res`,
              java: `// O(n) time, O(min(n,m)) space
public int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> seen = new HashMap<>();
    int l = 0, res = 0;
    for (int r = 0; r < s.length(); r++) {
        char c = s.charAt(r);
        if (seen.containsKey(c) && seen.get(c) >= l)
            l = seen.get(c) + 1;
        seen.put(c, r);
        res = Math.max(res, r - l + 1);
    }
    return res;
}`,
              javascript: `// O(n) time, O(min(n,m)) space
function lengthOfLongestSubstring(s) {
    const seen = new Map();
    let l = 0, res = 0;
    for (let r = 0; r < s.length; r++) {
        if (seen.has(s[r]) && seen.get(s[r]) >= l)
            l = seen.get(s[r]) + 1;
        seen.set(s[r], r);
        res = Math.max(res, r - l + 1);
    }
    return res;
}`,
            },
          },
          {
            id: 'lc-sw-3', text: '#424 Longest Repeating Character Replacement', tag: 'medium',
            url: 'https://leetcode.com/problems/longest-repeating-character-replacement/',
            note: 'window size - maxCount > k → shrink; key insight: maxCount never decreases',
            solutions: {
              python: `# O(n) time, O(26) space
def characterReplacement(s: str, k: int) -> int:
    count = {}
    res = maxCount = l = 0
    for r, c in enumerate(s):
        count[c] = count.get(c, 0) + 1
        maxCount = max(maxCount, count[c])
        # window invalid: need more than k replacements
        while (r - l + 1) - maxCount > k:
            count[s[l]] -= 1
            l += 1
        res = max(res, r - l + 1)
    return res`,
              java: `// O(n) time, O(26) space
public int characterReplacement(String s, int k) {
    int[] count = new int[26];
    int l = 0, maxCount = 0, res = 0;
    for (int r = 0; r < s.length(); r++) {
        count[s.charAt(r) - 'A']++;
        maxCount = Math.max(maxCount, count[s.charAt(r) - 'A']);
        while ((r - l + 1) - maxCount > k)
            count[s.charAt(l++) - 'A']--;
        res = Math.max(res, r - l + 1);
    }
    return res;
}`,
              javascript: `// O(n) time, O(26) space
function characterReplacement(s, k) {
    const count = new Array(26).fill(0);
    let l = 0, maxCount = 0, res = 0;
    for (let r = 0; r < s.length; r++) {
        count[s.charCodeAt(r) - 65]++;
        maxCount = Math.max(maxCount, count[s.charCodeAt(r) - 65]);
        while ((r - l + 1) - maxCount > k)
            count[s.charCodeAt(l++) - 65]--;
        res = Math.max(res, r - l + 1);
    }
    return res;
}`,
            },
          },
          {
            id: 'lc-sw-4', text: '#567 Permutation in String', tag: 'medium',
            url: 'https://leetcode.com/problems/permutation-in-string/',
            note: 'Fixed-size window of len(s1), compare char counts',
            solutions: {
              python: `# O(n) time, O(1) space
from collections import Counter

def checkInclusion(s1: str, s2: str) -> bool:
    if len(s1) > len(s2): return False
    c1, c2 = Counter(s1), Counter(s2[:len(s1)])
    if c1 == c2: return True
    for i in range(len(s1), len(s2)):
        c2[s2[i]] += 1
        c = s2[i - len(s1)]
        c2[c] -= 1
        if c2[c] == 0: del c2[c]
        if c1 == c2: return True
    return False`,
              java: `// O(n) time, O(1) space — int[26] sliding window
public boolean checkInclusion(String s1, String s2) {
    if (s1.length() > s2.length()) return false;
    int[] c1 = new int[26], c2 = new int[26];
    for (char c : s1.toCharArray()) c1[c - 'a']++;
    for (int i = 0; i < s1.length(); i++) c2[s2.charAt(i) - 'a']++;
    if (Arrays.equals(c1, c2)) return true;
    for (int i = s1.length(); i < s2.length(); i++) {
        c2[s2.charAt(i) - 'a']++;
        c2[s2.charAt(i - s1.length()) - 'a']--;
        if (Arrays.equals(c1, c2)) return true;
    }
    return false;
}`,
              javascript: `// O(n) time, O(1) space — int[26] sliding window
function checkInclusion(s1, s2) {
    if (s1.length > s2.length) return false;
    const c1 = new Array(26).fill(0), c2 = new Array(26).fill(0);
    for (const c of s1) c1[c.charCodeAt(0) - 97]++;
    for (let i = 0; i < s1.length; i++) c2[s2.charCodeAt(i) - 97]++;
    if (c1.join() === c2.join()) return true;
    for (let i = s1.length; i < s2.length; i++) {
        c2[s2.charCodeAt(i) - 97]++;
        c2[s2.charCodeAt(i - s1.length) - 97]--;
        if (c1.join() === c2.join()) return true;
    }
    return false;
}`,
            },
          },
          {
            id: 'lc-sw-5', text: '#76 Minimum Window Substring', tag: 'hard',
            url: 'https://leetcode.com/problems/minimum-window-substring/',
            note: 'Two HashMaps: have vs need; shrink when valid',
            solutions: {
              python: `# O(n) time, O(|charset|) space
from collections import Counter

def minWindow(s: str, t: str) -> str:
    if not t: return ''
    need, have = Counter(t), {}
    formed, required = 0, len(need)
    res, res_len = [-1, -1], float('inf')
    l = 0
    for r, c in enumerate(s):
        have[c] = have.get(c, 0) + 1
        if c in need and have[c] == need[c]:
            formed += 1
        while formed == required:
            if r - l + 1 < res_len:
                res, res_len = [l, r], r - l + 1
            have[s[l]] -= 1
            if s[l] in need and have[s[l]] < need[s[l]]:
                formed -= 1
            l += 1
    return s[res[0]:res[1] + 1] if res_len != float('inf') else ''`,
              java: `// O(n) time, O(|charset|) space
public String minWindow(String s, String t) {
    if (t.isEmpty()) return "";
    Map<Character, Integer> need = new HashMap<>(), have = new HashMap<>();
    for (char c : t.toCharArray()) need.merge(c, 1, Integer::sum);
    int formed = 0, required = need.size(), l = 0;
    int resL = -1, resLen = Integer.MAX_VALUE;
    for (int r = 0; r < s.length(); r++) {
        char c = s.charAt(r);
        have.merge(c, 1, Integer::sum);
        if (need.containsKey(c) && have.get(c).equals(need.get(c))) formed++;
        while (formed == required) {
            if (r - l + 1 < resLen) { resLen = r - l + 1; resL = l; }
            char lc = s.charAt(l);
            have.merge(lc, -1, Integer::sum);
            if (need.containsKey(lc) && have.get(lc) < need.get(lc)) formed--;
            l++;
        }
    }
    return resL == -1 ? "" : s.substring(resL, resL + resLen);
}`,
              javascript: `// O(n) time, O(|charset|) space
function minWindow(s, t) {
    if (!t) return '';
    const need = new Map(), have = new Map();
    for (const c of t) need.set(c, (need.get(c) || 0) + 1);
    let formed = 0, required = need.size, l = 0;
    let resStart = -1, resLen = Infinity;
    for (let r = 0; r < s.length; r++) {
        const c = s[r];
        have.set(c, (have.get(c) || 0) + 1);
        if (need.has(c) && have.get(c) === need.get(c)) formed++;
        while (formed === required) {
            if (r - l + 1 < resLen) { resLen = r - l + 1; resStart = l; }
            const lc = s[l];
            have.set(lc, have.get(lc) - 1);
            if (need.has(lc) && have.get(lc) < need.get(lc)) formed--;
            l++;
        }
    }
    return resStart === -1 ? '' : s.slice(resStart, resStart + resLen);
}`,
            },
          },
          {
            id: 'lc-sw-6', text: '#239 Sliding Window Maximum', tag: 'hard',
            url: 'https://leetcode.com/problems/sliding-window-maximum/',
            note: 'Monotonic deque (decreasing), pop front when out of window',
            solutions: {
              python: `# O(n) time, O(k) space — monotonic deque
from collections import deque

def maxSlidingWindow(nums: list[int], k: int) -> list[int]:
    q, res = deque(), []   # q stores indices
    for i, n in enumerate(nums):
        # pop smaller elements — they can never be the max
        while q and nums[q[-1]] < n:
            q.pop()
        q.append(i)
        # remove index outside window
        if q[0] <= i - k:
            q.popleft()
        if i >= k - 1:
            res.append(nums[q[0]])
    return res`,
              java: `// O(n) time, O(k) space — monotonic deque of indices
public int[] maxSlidingWindow(int[] nums, int k) {
    int[] res = new int[nums.length - k + 1];
    Deque<Integer> q = new ArrayDeque<>();  // stores indices
    for (int i = 0; i < nums.length; i++) {
        while (!q.isEmpty() && nums[q.peekLast()] < nums[i]) q.pollLast();
        q.addLast(i);
        if (q.peekFirst() <= i - k) q.pollFirst();
        if (i >= k - 1) res[i - k + 1] = nums[q.peekFirst()];
    }
    return res;
}`,
              javascript: `// O(n) time, O(k) space — monotonic deque of indices
function maxSlidingWindow(nums, k) {
    const q = [], res = [];  // q stores indices
    for (let i = 0; i < nums.length; i++) {
        while (q.length && nums[q[q.length - 1]] < nums[i]) q.pop();
        q.push(i);
        if (q[0] <= i - k) q.shift();
        if (i >= k - 1) res.push(nums[q[0]]);
    }
    return res;
}`,
            },
          },
        ],
      },
    ],
  },
  {
    id: 'lc-stack',
    label: 'Stack',
    weeks: 'Pattern 04',
    theme: 'success',
    sections: [
      {
        id: 'lc-stk-s',
        title: 'Stack',
        week: '7 problems · NeetCode 150',
        items: [
          {
            id: 'lc-stk-1', text: '#20 Valid Parentheses', tag: 'easy',
            url: 'https://leetcode.com/problems/valid-parentheses/',
            note: 'Push opens, pop and match on close',
            solution: `# O(n) time, O(n) space
def isValid(s: str) -> bool:
    stack = []
    match = {')': '(', ']': '[', '}': '{'}
    for c in s:
        if c in match:
            if not stack or stack[-1] != match[c]:
                return False
            stack.pop()
        else:
            stack.append(c)
    return not stack`,
          },
          {
            id: 'lc-stk-2', text: '#155 Min Stack', tag: 'medium',
            url: 'https://leetcode.com/problems/min-stack/',
            note: 'Parallel stack tracking current min at each push',
            solution: `# O(1) push/pop/top/getMin
class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        m = min(val, self.min_stack[-1] if self.min_stack else val)
        self.min_stack.append(m)

    def pop(self) -> None:
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]`,
          },
          {
            id: 'lc-stk-3', text: '#150 Evaluate Reverse Polish Notation', tag: 'medium',
            url: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/',
            note: 'Push numbers, pop two on operator',
            solution: `# O(n) time, O(n) space
def evalRPN(tokens: list[str]) -> int:
    stack = []
    for t in tokens:
        if t in '+-*/':
            b, a = stack.pop(), stack.pop()
            if t == '+':   stack.append(a + b)
            elif t == '-': stack.append(a - b)
            elif t == '*': stack.append(a * b)
            else:          stack.append(int(a / b))  # truncate toward zero
        else:
            stack.append(int(t))
    return stack[0]`,
          },
          {
            id: 'lc-stk-4', text: '#22 Generate Parentheses', tag: 'medium',
            url: 'https://leetcode.com/problems/generate-parentheses/',
            note: 'Backtracking: open < n → add "(", close < open → add ")"',
            solution: `# O(4^n / sqrt(n)) time — Catalan number
def generateParenthesis(n: int) -> list[str]:
    res = []
    def bt(s: str, open: int, close: int) -> None:
        if len(s) == 2 * n:
            res.append(s)
            return
        if open < n:   bt(s + '(', open + 1, close)
        if close < open: bt(s + ')', open, close + 1)
    bt('', 0, 0)
    return res`,
          },
          {
            id: 'lc-stk-5', text: '#739 Daily Temperatures', tag: 'medium',
            url: 'https://leetcode.com/problems/daily-temperatures/',
            note: 'Monotonic stack (decreasing): pop when warmer day found',
            solution: `# O(n) time, O(n) space — monotonic decreasing stack
def dailyTemperatures(temperatures: list[int]) -> list[int]:
    res = [0] * len(temperatures)
    stack = []  # (temp, index)
    for i, t in enumerate(temperatures):
        while stack and t > stack[-1][0]:
            _, j = stack.pop()
            res[j] = i - j
        stack.append((t, i))
    return res`,
          },
          {
            id: 'lc-stk-6', text: '#853 Car Fleet', tag: 'medium',
            url: 'https://leetcode.com/problems/car-fleet/',
            note: 'Sort by position desc, compute arrival time; fleet if time ≤ top of stack',
            solution: `# O(n log n) time, O(n) space
def carFleet(target: int, position: list[int], speed: list[int]) -> int:
    pairs = sorted(zip(position, speed), reverse=True)
    stack = []
    for pos, spd in pairs:
        t = (target - pos) / spd
        if not stack or t > stack[-1]:
            stack.append(t)
        # if t <= stack[-1], car catches the one ahead → same fleet
    return len(stack)`,
          },
          {
            id: 'lc-stk-7', text: '#84 Largest Rectangle in Histogram', tag: 'hard',
            url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',
            note: 'Monotonic stack (increasing); extend backward on pop',
            solution: `# O(n) time, O(n) space — monotonic increasing stack
def largestRectangleArea(heights: list[int]) -> int:
    stack = []   # (start_index, height)
    max_area = 0
    for i, h in enumerate(heights):
        start = i
        while stack and stack[-1][1] > h:
            j, height = stack.pop()
            max_area = max(max_area, height * (i - j))
            start = j
        stack.append((start, h))
    for i, h in stack:
        max_area = max(max_area, h * (len(heights) - i))
    return max_area`,
          },
        ],
      },
    ],
  },
  {
    id: 'lc-binsearch',
    label: 'Binary Search',
    weeks: 'Pattern 05',
    theme: 'info',
    sections: [
      {
        id: 'lc-bs-s',
        title: 'Binary Search',
        week: '7 problems · NeetCode 150',
        items: [
          {
            id: 'lc-bs-1', text: '#704 Binary Search', tag: 'easy',
            url: 'https://leetcode.com/problems/binary-search/',
            note: 'Template: lo=0, hi=n-1; mid=(lo+hi)//2; lo=mid+1 or hi=mid-1',
            solution: `# O(log n) time, O(1) space
def search(nums: list[int], target: int) -> int:
    l, r = 0, len(nums) - 1
    while l <= r:
        m = (l + r) // 2
        if nums[m] == target: return m
        elif nums[m] < target: l = m + 1
        else: r = m - 1
    return -1`,
          },
          {
            id: 'lc-bs-2', text: '#74 Search a 2D Matrix', tag: 'medium',
            url: 'https://leetcode.com/problems/search-a-2d-matrix/',
            note: 'Treat as flat sorted array; row = mid//cols, col = mid%cols',
            solution: `# O(log(m*n)) time, O(1) space
def searchMatrix(matrix: list[list[int]], target: int) -> bool:
    m, n = len(matrix), len(matrix[0])
    l, r = 0, m * n - 1
    while l <= r:
        mid = (l + r) // 2
        val = matrix[mid // n][mid % n]
        if val == target:   return True
        elif val < target:  l = mid + 1
        else:               r = mid - 1
    return False`,
          },
          {
            id: 'lc-bs-3', text: '#875 Koko Eating Bananas', tag: 'medium',
            url: 'https://leetcode.com/problems/koko-eating-bananas/',
            note: 'Binary search on answer (speed); check feasibility with ceil division',
            solution: `# O(n log(max(piles))) time
import math

def minEatingSpeed(piles: list[int], h: int) -> int:
    l, r = 1, max(piles)
    while l < r:
        m = (l + r) // 2
        hours = sum(math.ceil(p / m) for p in piles)
        if hours <= h: r = m
        else:          l = m + 1
    return l`,
          },
          {
            id: 'lc-bs-4', text: '#153 Find Minimum in Rotated Sorted Array', tag: 'medium',
            url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
            note: 'If mid > right → min in right half; else in left half',
            solution: `# O(log n) time, O(1) space
def findMin(nums: list[int]) -> int:
    l, r = 0, len(nums) - 1
    while l < r:
        m = (l + r) // 2
        if nums[m] > nums[r]: l = m + 1   # min is in right half
        else:                 r = m        # min is in left half (incl. m)
    return nums[l]`,
          },
          {
            id: 'lc-bs-5', text: '#33 Search in Rotated Sorted Array', tag: 'medium',
            url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
            note: 'Determine which half is sorted, then narrow to correct half',
            solution: `# O(log n) time, O(1) space
def search(nums: list[int], target: int) -> int:
    l, r = 0, len(nums) - 1
    while l <= r:
        m = (l + r) // 2
        if nums[m] == target: return m
        if nums[l] <= nums[m]:            # left half is sorted
            if nums[l] <= target < nums[m]:
                r = m - 1
            else:
                l = m + 1
        else:                             # right half is sorted
            if nums[m] < target <= nums[r]:
                l = m + 1
            else:
                r = m - 1
    return -1`,
          },
          {
            id: 'lc-bs-6', text: '#981 Time Based Key-Value Store', tag: 'medium',
            url: 'https://leetcode.com/problems/time-based-key-value-store/',
            note: 'Store list of (timestamp, value); binary search for largest ≤ t',
            solution: `# O(1) set, O(log n) get
import bisect
from collections import defaultdict

class TimeMap:
    def __init__(self):
        self.d = defaultdict(list)   # key -> [(timestamp, value)]

    def set(self, key: str, value: str, timestamp: int) -> None:
        self.d[key].append((timestamp, value))

    def get(self, key: str, timestamp: int) -> str:
        vals = self.d[key]
        i = bisect.bisect_right(vals, (timestamp, chr(127))) - 1
        return vals[i][1] if i >= 0 else ''`,
          },
          {
            id: 'lc-bs-7', text: '#4 Median of Two Sorted Arrays', tag: 'hard',
            url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/',
            note: 'Binary search on partition of smaller array; O(log(min(m,n)))',
            solution: `# O(log(min(m,n))) time — binary search on smaller array partition
def findMedianSortedArrays(nums1: list[int], nums2: list[int]) -> float:
    A, B = nums1, nums2
    if len(A) > len(B): A, B = B, A
    m, n = len(A), len(B)
    half = (m + n) // 2
    l, r = 0, m - 1
    while True:
        i = (l + r) // 2        # partition index in A
        j = half - i - 2        # partition index in B
        Aleft  = A[i]     if i >= 0     else float('-inf')
        Aright = A[i + 1] if i + 1 < m else float('inf')
        Bleft  = B[j]     if j >= 0     else float('-inf')
        Bright = B[j + 1] if j + 1 < n else float('inf')
        if Aleft <= Bright and Bleft <= Aright:
            if (m + n) % 2:
                return float(min(Aright, Bright))
            return (max(Aleft, Bleft) + min(Aright, Bright)) / 2
        elif Aleft > Bright: r = i - 1
        else:                l = i + 1`,
          },
        ],
      },
    ],
  },
  {
    id: 'lc-linkedlist',
    label: 'Linked List',
    weeks: 'Pattern 06',
    theme: 'info',
    sections: [
      {
        id: 'lc-ll-s',
        title: 'Linked List',
        week: '11 problems · NeetCode 150',
        items: [
          {
            id: 'lc-ll-1', text: '#206 Reverse Linked List', tag: 'easy',
            url: 'https://leetcode.com/problems/reverse-linked-list/',
            note: 'Three pointers: prev=null, curr, next; iterative or recursive',
            solution: `# O(n) time, O(1) space — iterative
def reverseList(head):
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
          },
          {
            id: 'lc-ll-2', text: '#21 Merge Two Sorted Lists', tag: 'easy',
            url: 'https://leetcode.com/problems/merge-two-sorted-lists/',
            note: 'Dummy head + compare and advance; attach remainder',
            solution: `# O(m+n) time, O(1) space
def mergeTwoLists(l1, l2):
    dummy = cur = ListNode()
    while l1 and l2:
        if l1.val <= l2.val:
            cur.next = l1; l1 = l1.next
        else:
            cur.next = l2; l2 = l2.next
        cur = cur.next
    cur.next = l1 or l2
    return dummy.next`,
          },
          {
            id: 'lc-ll-3', text: '#143 Reorder List', tag: 'medium',
            url: 'https://leetcode.com/problems/reorder-list/',
            note: 'Find mid (slow/fast), reverse second half, merge alternating',
            solution: `# O(n) time, O(1) space — three phases
def reorderList(head) -> None:
    # 1. Find middle (slow/fast pointers)
    slow, fast = head, head.next
    while fast and fast.next:
        slow = slow.next; fast = fast.next.next
    # 2. Reverse second half
    second, slow.next = slow.next, None
    prev = None
    while second:
        tmp = second.next; second.next = prev
        prev = second; second = tmp
    # 3. Merge interleaved
    first, second = head, prev
    while second:
        tmp1, tmp2 = first.next, second.next
        first.next = second; second.next = tmp1
        first, second = tmp1, tmp2`,
          },
          {
            id: 'lc-ll-4', text: '#19 Remove Nth Node From End of List', tag: 'medium',
            url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
            note: 'Two pointers n apart; when fast reaches end, slow is target',
            solution: `# O(n) time, O(1) space — one pass with dummy head
def removeNthFromEnd(head, n: int):
    dummy = ListNode(0, head)
    fast = dummy
    for _ in range(n): fast = fast.next
    slow = dummy
    while fast.next:
        slow = slow.next; fast = fast.next
    slow.next = slow.next.next
    return dummy.next`,
          },
          {
            id: 'lc-ll-5', text: '#138 Copy List with Random Pointer', tag: 'medium',
            url: 'https://leetcode.com/problems/copy-list-with-random-pointer/',
            note: 'HashMap original→copy; two passes',
            solution: `# O(n) time, O(n) space
def copyRandomList(head):
    m = {None: None}
    cur = head
    while cur:
        m[cur] = Node(cur.val)
        cur = cur.next
    cur = head
    while cur:
        m[cur].next   = m[cur.next]
        m[cur].random = m[cur.random]
        cur = cur.next
    return m[head]`,
          },
          {
            id: 'lc-ll-6', text: '#2 Add Two Numbers', tag: 'medium',
            url: 'https://leetcode.com/problems/add-two-numbers/',
            note: 'Simulate addition digit by digit; carry handling',
            solution: `# O(max(m,n)) time, O(max(m,n)) space
def addTwoNumbers(l1, l2):
    dummy = cur = ListNode()
    carry = 0
    while l1 or l2 or carry:
        v1 = l1.val if l1 else 0
        v2 = l2.val if l2 else 0
        carry, val = divmod(v1 + v2 + carry, 10)
        cur.next = ListNode(val); cur = cur.next
        if l1: l1 = l1.next
        if l2: l2 = l2.next
    return dummy.next`,
          },
          {
            id: 'lc-ll-7', text: '#141 Linked List Cycle', tag: 'easy',
            url: 'https://leetcode.com/problems/linked-list-cycle/',
            note: "Floyd's slow/fast pointers — meet if cycle exists",
            solution: `# O(n) time, O(1) space — Floyd's cycle detection
def hasCycle(head) -> bool:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False`,
          },
          {
            id: 'lc-ll-8', text: '#287 Find the Duplicate Number', tag: 'medium',
            url: 'https://leetcode.com/problems/find-the-duplicate-number/',
            note: "Floyd's cycle detection on index graph",
            solution: `# O(n) time, O(1) space — Floyd's on index graph
# Treat array as linked list: i -> nums[i]
def findDuplicate(nums: list[int]) -> int:
    slow = fast = nums[0]
    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast: break
    # Phase 2: find entry point of cycle
    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]
    return slow`,
          },
          {
            id: 'lc-ll-9', text: '#146 LRU Cache', tag: 'medium',
            url: 'https://leetcode.com/problems/lru-cache/',
            note: 'HashMap + doubly linked list; O(1) get and put',
            solution: `# O(1) get and put — HashMap + doubly linked list
class Node:
    def __init__(self, k=0, v=0):
        self.key, self.val = k, v
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {}
        self.head = self.tail = Node()   # sentinels
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int) -> int:
        if key not in self.cache: return -1
        self._remove(self.cache[key])
        self._insert(self.cache[key])
        return self.cache[key].val

    def put(self, key: int, value: int) -> None:
        if key in self.cache: self._remove(self.cache[key])
        self.cache[key] = Node(key, value)
        self._insert(self.cache[key])
        if len(self.cache) > self.cap:
            lru = self.head.next
            self._remove(lru)
            del self.cache[lru.key]

    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _insert(self, node):   # insert before tail (MRU position)
        node.prev = self.tail.prev
        node.next = self.tail
        self.tail.prev.next = node
        self.tail.prev = node`,
          },
          {
            id: 'lc-ll-10', text: '#23 Merge K Sorted Lists', tag: 'hard',
            url: 'https://leetcode.com/problems/merge-k-sorted-lists/',
            note: 'Min-heap of (val, listIndex) — O(N log k)',
            solution: `# O(N log k) time — k-way merge with min-heap
import heapq

def mergeKLists(lists):
    heap = []
    for i, l in enumerate(lists):
        if l: heapq.heappush(heap, (l.val, i, l))
    dummy = cur = ListNode()
    while heap:
        val, i, node = heapq.heappop(heap)
        cur.next = node; cur = cur.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    return dummy.next`,
          },
          {
            id: 'lc-ll-11', text: '#25 Reverse Nodes in K-Group', tag: 'hard',
            url: 'https://leetcode.com/problems/reverse-nodes-in-k-group/',
            note: 'Check k nodes exist, reverse in place, recurse on rest',
            solution: `# O(n) time, O(1) space — iterative group reversal
def reverseKGroup(head, k: int):
    def get_kth(curr, k):
        while curr and k > 0:
            curr = curr.next; k -= 1
        return curr

    dummy = ListNode(0, head)
    group_prev = dummy
    while True:
        kth = get_kth(group_prev, k)
        if not kth: break
        group_next = kth.next
        # reverse group
        prev, curr = kth.next, group_prev.next
        while curr != group_next:
            tmp = curr.next; curr.next = prev
            prev = curr; curr = tmp
        tmp = group_prev.next
        group_prev.next = kth
        group_prev = tmp
    return dummy.next`,
          },
        ],
      },
    ],
  },
  {
    id: 'lc-trees',
    label: 'Trees',
    weeks: 'Pattern 07',
    theme: 'warning',
    sections: [
      {
        id: 'lc-tr-s',
        title: 'Binary Trees',
        week: '11 problems · NeetCode 150',
        items: [
          {
            id: 'lc-tr-1', text: '#226 Invert Binary Tree', tag: 'easy',
            url: 'https://leetcode.com/problems/invert-binary-tree/',
            note: 'Swap left/right at every node (DFS or BFS)',
            solution: `# O(n) time, O(h) space (recursion stack)
def invertTree(root):
    if not root: return None
    root.left, root.right = invertTree(root.right), invertTree(root.left)
    return root`,
          },
          {
            id: 'lc-tr-2', text: '#104 Maximum Depth of Binary Tree', tag: 'easy',
            url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
            note: '1 + max(depth(left), depth(right))',
            solution: `# O(n) time, O(h) space
def maxDepth(root) -> int:
    if not root: return 0
    return 1 + max(maxDepth(root.left), maxDepth(root.right))`,
          },
          {
            id: 'lc-tr-3', text: '#543 Diameter of Binary Tree', tag: 'easy',
            url: 'https://leetcode.com/problems/diameter-of-binary-tree/',
            note: 'At each node: diameter = leftHeight + rightHeight; track global max',
            solution: `# O(n) time — DFS, track max at each node
def diameterOfBinaryTree(root) -> int:
    res = [0]
    def dfs(node) -> int:
        if not node: return 0
        l, r = dfs(node.left), dfs(node.right)
        res[0] = max(res[0], l + r)  # diameter through this node
        return 1 + max(l, r)
    dfs(root)
    return res[0]`,
          },
          {
            id: 'lc-tr-4', text: '#110 Balanced Binary Tree', tag: 'easy',
            url: 'https://leetcode.com/problems/balanced-binary-tree/',
            note: 'DFS returns height; return -1 if unbalanced, propagate up',
            solution: `# O(n) time — return -1 to signal imbalance
def isBalanced(root) -> bool:
    def dfs(node) -> int:
        if not node: return 0
        l, r = dfs(node.left), dfs(node.right)
        if l == -1 or r == -1 or abs(l - r) > 1:
            return -1
        return 1 + max(l, r)
    return dfs(root) != -1`,
          },
          {
            id: 'lc-tr-5', text: '#100 Same Tree', tag: 'easy',
            url: 'https://leetcode.com/problems/same-tree/',
            note: 'Recurse: both null → true; one null or val differ → false',
            solution: `# O(n) time
def isSameTree(p, q) -> bool:
    if not p and not q: return True
    if not p or not q or p.val != q.val: return False
    return isSameTree(p.left, q.left) and isSameTree(p.right, q.right)`,
          },
          {
            id: 'lc-tr-6', text: '#572 Subtree of Another Tree', tag: 'easy',
            url: 'https://leetcode.com/problems/subtree-of-another-tree/',
            note: 'isSameTree at every node of root',
            solution: `# O(s*t) time
def isSubtree(root, subRoot) -> bool:
    if not root: return False
    if isSameTree(root, subRoot): return True
    return isSubtree(root.left, subRoot) or isSubtree(root.right, subRoot)

def isSameTree(p, q) -> bool:
    if not p and not q: return True
    if not p or not q or p.val != q.val: return False
    return isSameTree(p.left, q.left) and isSameTree(p.right, q.right)`,
          },
          {
            id: 'lc-tr-7', text: '#235 Lowest Common Ancestor of BST', tag: 'medium',
            url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/',
            note: 'BST property: diverge point is LCA',
            solution: `# O(h) time — BST: where p and q diverge is the LCA
def lowestCommonAncestor(root, p, q):
    while root:
        if p.val < root.val and q.val < root.val:
            root = root.left
        elif p.val > root.val and q.val > root.val:
            root = root.right
        else:
            return root  # diverge point = LCA`,
          },
          {
            id: 'lc-tr-8', text: '#102 Binary Tree Level Order Traversal', tag: 'medium',
            url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
            note: 'BFS with queue; snapshot queue length each level',
            solution: `# O(n) time — BFS level by level
from collections import deque

def levelOrder(root) -> list[list[int]]:
    if not root: return []
    res, q = [], deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left:  q.append(node.left)
            if node.right: q.append(node.right)
        res.append(level)
    return res`,
          },
          {
            id: 'lc-tr-9', text: '#199 Binary Tree Right Side View', tag: 'medium',
            url: 'https://leetcode.com/problems/binary-tree-right-side-view/',
            note: 'BFS, take last node of each level',
            solution: `# O(n) time — BFS, capture rightmost node per level
from collections import deque

def rightSideView(root) -> list[int]:
    if not root: return []
    res, q = [], deque([root])
    while q:
        rightmost = None
        for _ in range(len(q)):
            node = q.popleft()
            rightmost = node
            if node.left:  q.append(node.left)
            if node.right: q.append(node.right)
        res.append(rightmost.val)
    return res`,
          },
          {
            id: 'lc-tr-10', text: '#230 Kth Smallest Element in a BST', tag: 'medium',
            url: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/',
            note: 'In-order traversal (left→root→right) gives sorted order',
            solution: `# O(n) time — iterative in-order (sorted order in BST)
def kthSmallest(root, k: int) -> int:
    stack, curr = [], root
    while True:
        while curr:
            stack.append(curr); curr = curr.left
        curr = stack.pop(); k -= 1
        if k == 0: return curr.val
        curr = curr.right`,
          },
          {
            id: 'lc-tr-11', text: '#105 Construct Tree from Preorder and Inorder', tag: 'medium',
            url: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/',
            note: 'preorder[0] = root; find in inorder to split left/right',
            solution: `# O(n) time with HashMap for inorder lookup
def buildTree(preorder: list[int], inorder: list[int]):
    idx_map = {v: i for i, v in enumerate(inorder)}

    def build(pre_l, pre_r, in_l, in_r):
        if pre_l > pre_r: return None
        root = TreeNode(preorder[pre_l])
        mid = idx_map[preorder[pre_l]]
        left_size = mid - in_l
        root.left  = build(pre_l + 1, pre_l + left_size, in_l, mid - 1)
        root.right = build(pre_l + left_size + 1, pre_r, mid + 1, in_r)
        return root

    return build(0, len(preorder) - 1, 0, len(inorder) - 1)`,
          },
        ],
      },
      {
        id: 'lc-trie-s',
        title: 'Trie',
        week: '2 problems · NeetCode 150',
        items: [
          {
            id: 'lc-trie-1', text: '#208 Implement Trie (Prefix Tree)', tag: 'medium',
            url: 'https://leetcode.com/problems/implement-trie-prefix-tree/',
            note: 'Node: children[26], isEnd; insert/search/startsWith in O(L)',
            solution: `# O(L) insert/search/startsWith (L = word length)
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        cur = self.root
        for c in word:
            if c not in cur.children:
                cur.children[c] = TrieNode()
            cur = cur.children[c]
        cur.is_end = True

    def search(self, word: str) -> bool:
        cur = self.root
        for c in word:
            if c not in cur.children: return False
            cur = cur.children[c]
        return cur.is_end

    def startsWith(self, prefix: str) -> bool:
        cur = self.root
        for c in prefix:
            if c not in cur.children: return False
            cur = cur.children[c]
        return True`,
          },
          {
            id: 'lc-trie-2', text: '#211 Design Add and Search Words Data Structure', tag: 'medium',
            url: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/',
            note: 'Trie + DFS for "." wildcard',
            solution: `# Trie + DFS recursion for '.' wildcard
class WordDictionary:
    def __init__(self):
        self.root = TrieNode()

    def addWord(self, word: str) -> None:
        cur = self.root
        for c in word:
            if c not in cur.children:
                cur.children[c] = TrieNode()
            cur = cur.children[c]
        cur.is_end = True

    def search(self, word: str) -> bool:
        def dfs(j: int, node) -> bool:
            for i in range(j, len(word)):
                c = word[i]
                if c == '.':
                    return any(dfs(i + 1, child)
                               for child in node.children.values())
                if c not in node.children: return False
                node = node.children[c]
            return node.is_end
        return dfs(0, self.root)

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False`,
          },
        ],
      },
    ],
  },
  {
    id: 'lc-backtrack',
    label: 'Backtracking',
    weeks: 'Pattern 08',
    theme: 'warning',
    sections: [
      {
        id: 'lc-bt-s',
        title: 'Backtracking',
        week: '9 problems · NeetCode 150',
        items: [
          {
            id: 'lc-bt-1', text: '#78 Subsets', tag: 'medium',
            url: 'https://leetcode.com/problems/subsets/',
            note: 'Include or exclude each element; 2^n total subsets',
            solution: `# O(2^n) time — include/exclude at each step
def subsets(nums: list[int]) -> list[list[int]]:
    res, sub = [], []
    def bt(i: int) -> None:
        if i == len(nums):
            res.append(sub.copy()); return
        sub.append(nums[i]); bt(i + 1)   # include
        sub.pop();           bt(i + 1)   # exclude
    bt(0)
    return res`,
          },
          {
            id: 'lc-bt-2', text: '#39 Combination Sum', tag: 'medium',
            url: 'https://leetcode.com/problems/combination-sum/',
            note: 'Can reuse elements; branch: include (stay at i) or skip (i+1)',
            solution: `# O(2^(t/m)) time — t=target, m=min candidate
def combinationSum(candidates: list[int], target: int) -> list[list[int]]:
    res = []
    def bt(i: int, cur: list, total: int) -> None:
        if total == target: res.append(cur.copy()); return
        if i >= len(candidates) or total > target: return
        cur.append(candidates[i])
        bt(i, cur, total + candidates[i])     # reuse same element
        cur.pop()
        bt(i + 1, cur, total)                 # skip to next
    bt(0, [], 0)
    return res`,
          },
          {
            id: 'lc-bt-3', text: '#46 Permutations', tag: 'medium',
            url: 'https://leetcode.com/problems/permutations/',
            note: 'Swap into position or use visited array; n! permutations',
            solution: `# O(n!) time — pick from remaining at each step
def permute(nums: list[int]) -> list[list[int]]:
    res = []
    def bt(path: list, remaining: list) -> None:
        if not remaining: res.append(path); return
        for i, n in enumerate(remaining):
            bt(path + [n], remaining[:i] + remaining[i + 1:])
    bt([], nums)
    return res`,
          },
          {
            id: 'lc-bt-4', text: '#90 Subsets II', tag: 'medium',
            url: 'https://leetcode.com/problems/subsets-ii/',
            note: 'Sort + skip duplicates at same recursion level',
            solution: `# O(2^n) time — sort then skip same element at same level
def subsetsWithDup(nums: list[int]) -> list[list[int]]:
    nums.sort()
    res, sub = [], []
    def bt(i: int) -> None:
        res.append(sub.copy())
        for j in range(i, len(nums)):
            if j > i and nums[j] == nums[j - 1]: continue  # skip dup
            sub.append(nums[j]); bt(j + 1); sub.pop()
    bt(0)
    return res`,
          },
          {
            id: 'lc-bt-5', text: '#40 Combination Sum II', tag: 'medium',
            url: 'https://leetcode.com/problems/combination-sum-ii/',
            note: 'Sort + skip same element at same level; each used once',
            solution: `# O(2^n) time — sort, skip duplicates at same depth
def combinationSum2(candidates: list[int], target: int) -> list[list[int]]:
    candidates.sort()
    res = []
    def bt(i: int, cur: list, total: int) -> None:
        if total == target: res.append(cur.copy()); return
        for j in range(i, len(candidates)):
            if j > i and candidates[j] == candidates[j - 1]: continue
            if total + candidates[j] > target: break
            cur.append(candidates[j])
            bt(j + 1, cur, total + candidates[j])
            cur.pop()
    bt(0, [], 0)
    return res`,
          },
          {
            id: 'lc-bt-6', text: '#79 Word Search', tag: 'medium',
            url: 'https://leetcode.com/problems/word-search/',
            note: 'DFS from each cell; mark visited; unmark on backtrack',
            solution: `# O(m*n * 4^L) time — DFS with in-place visited marking
def exist(board: list[list[str]], word: str) -> bool:
    rows, cols = len(board), len(board[0])
    def dfs(r: int, c: int, i: int) -> bool:
        if i == len(word): return True
        if r < 0 or c < 0 or r >= rows or c >= cols: return False
        if board[r][c] != word[i]: return False
        tmp, board[r][c] = board[r][c], '#'  # mark visited
        res = (dfs(r+1,c,i+1) or dfs(r-1,c,i+1) or
               dfs(r,c+1,i+1) or dfs(r,c-1,i+1))
        board[r][c] = tmp  # restore (backtrack)
        return res
    return any(dfs(r, c, 0) for r in range(rows) for c in range(cols))`,
          },
          {
            id: 'lc-bt-7', text: '#131 Palindrome Partitioning', tag: 'medium',
            url: 'https://leetcode.com/problems/palindrome-partitioning/',
            note: 'Try all prefixes that are palindromes; recurse on suffix',
            solution: `# O(n * 2^n) time — try each prefix palindrome
def partition(s: str) -> list[list[str]]:
    res, part = [], []
    def is_palin(l: int, r: int) -> bool:
        while l < r:
            if s[l] != s[r]: return False
            l += 1; r -= 1
        return True
    def bt(i: int) -> None:
        if i == len(s): res.append(part.copy()); return
        for j in range(i, len(s)):
            if is_palin(i, j):
                part.append(s[i:j + 1]); bt(j + 1); part.pop()
    bt(0)
    return res`,
          },
          {
            id: 'lc-bt-8', text: '#17 Letter Combinations of Phone Number', tag: 'medium',
            url: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/',
            note: 'Map digit to letters; recurse through digits',
            solution: `# O(4^n * n) time — n digits, up to 4 letters each
def letterCombinations(digits: str) -> list[str]:
    if not digits: return []
    phone = {'2':'abc','3':'def','4':'ghi','5':'jkl',
             '6':'mno','7':'pqrs','8':'tuv','9':'wxyz'}
    res = []
    def bt(i: int, cur: str) -> None:
        if i == len(digits): res.append(cur); return
        for c in phone[digits[i]]:
            bt(i + 1, cur + c)
    bt(0, '')
    return res`,
          },
          {
            id: 'lc-bt-9', text: '#51 N-Queens', tag: 'hard',
            url: 'https://leetcode.com/problems/n-queens/',
            note: 'Track cols, diagonals (r-c), anti-diagonals (r+c) in sets',
            solution: `# O(n!) time — backtracking with set-based attack tracking
def solveNQueens(n: int) -> list[list[str]]:
    cols, diag, anti = set(), set(), set()
    board = [['.'] * n for _ in range(n)]
    res = []
    def bt(r: int) -> None:
        if r == n:
            res.append([''.join(row) for row in board]); return
        for c in range(n):
            if c in cols or (r - c) in diag or (r + c) in anti: continue
            cols.add(c); diag.add(r - c); anti.add(r + c)
            board[r][c] = 'Q'
            bt(r + 1)
            cols.remove(c); diag.remove(r - c); anti.remove(r + c)
            board[r][c] = '.'
    bt(0)
    return res`,
          },
        ],
      },
    ],
  },
  {
    id: 'lc-heap',
    label: 'Heap / Priority Queue',
    weeks: 'Pattern 09',
    theme: 'warning',
    sections: [
      {
        id: 'lc-heap-s',
        title: 'Heap / Priority Queue',
        week: '7 problems · NeetCode 150',
        items: [
          {
            id: 'lc-heap-1', text: '#703 Kth Largest Element in a Stream', tag: 'easy',
            url: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/',
            note: 'Min-heap of size k; top = kth largest',
            solution: `# O(n log k) init, O(log k) add
import heapq

class KthLargest:
    def __init__(self, k: int, nums: list[int]):
        self.k = k
        self.heap = nums
        heapq.heapify(self.heap)
        while len(self.heap) > k:
            heapq.heappop(self.heap)

    def add(self, val: int) -> int:
        heapq.heappush(self.heap, val)
        if len(self.heap) > self.k:
            heapq.heappop(self.heap)
        return self.heap[0]  # min = kth largest`,
          },
          {
            id: 'lc-heap-2', text: '#1046 Last Stone Weight', tag: 'easy',
            url: 'https://leetcode.com/problems/last-stone-weight/',
            note: 'Max-heap; smash top two, push difference if non-zero',
            solution: `# O(n log n) time — max-heap (negate values)
import heapq

def lastStoneWeight(stones: list[int]) -> int:
    heap = [-s for s in stones]
    heapq.heapify(heap)
    while len(heap) > 1:
        a = -heapq.heappop(heap)
        b = -heapq.heappop(heap)
        if a != b:
            heapq.heappush(heap, -(a - b))
    return -heap[0] if heap else 0`,
          },
          {
            id: 'lc-heap-3', text: '#973 K Closest Points to Origin', tag: 'medium',
            url: 'https://leetcode.com/problems/k-closest-points-to-origin/',
            note: 'Min-heap by x²+y², pop k times (or max-heap size k)',
            solution: `# O(n log k) time — max-heap of size k
import heapq

def kClosest(points: list[list[int]], k: int) -> list[list[int]]:
    heap = []
    for x, y in points:
        dist = -(x * x + y * y)   # negate for max-heap
        heapq.heappush(heap, (dist, x, y))
        if len(heap) > k:
            heapq.heappop(heap)
    return [[x, y] for _, x, y in heap]`,
          },
          {
            id: 'lc-heap-4', text: '#215 Kth Largest Element in an Array', tag: 'medium',
            url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
            note: 'Min-heap size k — O(n log k); QuickSelect O(n) avg',
            solution: `# O(n log k) time — min-heap of size k
import heapq

def findKthLargest(nums: list[int], k: int) -> int:
    heap = []
    for n in nums:
        heapq.heappush(heap, n)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]  # smallest in heap = kth largest overall`,
          },
          {
            id: 'lc-heap-5', text: '#621 Task Scheduler', tag: 'medium',
            url: 'https://leetcode.com/problems/task-scheduler/',
            note: 'Max-heap; cooldown with queue of (count, readyTime)',
            solution: `# O(n log n) time — greedy with heap + cooldown queue
import heapq
from collections import Counter, deque

def leastInterval(tasks: list[str], n: int) -> int:
    count = Counter(tasks)
    heap = [-c for c in count.values()]
    heapq.heapify(heap)
    q = deque()   # (remaining_count, ready_at_time)
    time = 0
    while heap or q:
        time += 1
        if heap:
            c = 1 + heapq.heappop(heap)   # process one task
            if c: q.append((c, time + n))
        if q and q[0][1] == time:
            heapq.heappush(heap, q.popleft()[0])
    return time`,
          },
          {
            id: 'lc-heap-6', text: '#355 Design Twitter', tag: 'medium',
            url: 'https://leetcode.com/problems/design-twitter/',
            note: 'Per-user tweet list + k-way merge with heap for feed',
            solution: `# postTweet O(1), getNewsFeed O(k log k), follow/unfollow O(1)
import heapq
from collections import defaultdict

class Twitter:
    def __init__(self):
        self.count = 0
        self.tweets = defaultdict(list)   # uid -> [(timestamp, tweetId)]
        self.follows = defaultdict(set)

    def postTweet(self, userId: int, tweetId: int) -> None:
        self.tweets[userId].append((self.count, tweetId))
        self.count -= 1   # decrement so heap gives newest first

    def getNewsFeed(self, userId: int) -> list[int]:
        res, heap = [], []
        self.follows[userId].add(userId)
        for uid in self.follows[userId]:
            if uid in self.tweets:
                idx = len(self.tweets[uid]) - 1
                t, tid = self.tweets[uid][idx]
                heapq.heappush(heap, (t, tid, uid, idx - 1))
        while heap and len(res) < 10:
            t, tid, uid, idx = heapq.heappop(heap)
            res.append(tid)
            if idx >= 0:
                t2, tid2 = self.tweets[uid][idx]
                heapq.heappush(heap, (t2, tid2, uid, idx - 1))
        return res

    def follow(self, f: int, e: int) -> None: self.follows[f].add(e)
    def unfollow(self, f: int, e: int) -> None: self.follows[f].discard(e)`,
          },
          {
            id: 'lc-heap-7', text: '#295 Find Median from Data Stream', tag: 'hard',
            url: 'https://leetcode.com/problems/find-median-from-data-stream/',
            note: 'Max-heap (left) + min-heap (right); balance sizes ±1',
            solution: `# O(log n) addNum, O(1) findMedian — two balanced heaps
import heapq

class MedianFinder:
    def __init__(self):
        self.small = []   # max-heap (negated) — lower half
        self.large = []   # min-heap — upper half

    def addNum(self, num: int) -> None:
        heapq.heappush(self.small, -num)
        # ensure every element in small <= every element in large
        if self.small and self.large and (-self.small[0] > self.large[0]):
            heapq.heappush(self.large, -heapq.heappop(self.small))
        # balance sizes: small can have at most 1 more than large
        if len(self.small) > len(self.large) + 1:
            heapq.heappush(self.large, -heapq.heappop(self.small))
        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self) -> float:
        if len(self.small) > len(self.large):
            return float(-self.small[0])
        return (-self.small[0] + self.large[0]) / 2`,
          },
        ],
      },
    ],
  },
  {
    id: 'lc-graphs',
    label: 'Graphs',
    weeks: 'Pattern 10',
    theme: 'danger',
    sections: [
      {
        id: 'lc-gr-s',
        title: 'Graphs',
        week: '13 problems · NeetCode 150',
        items: [
          {
            id: 'lc-gr-1', text: '#200 Number of Islands', tag: 'medium',
            url: 'https://leetcode.com/problems/number-of-islands/',
            note: 'DFS/BFS from each "1", mark visited; count DFS calls',
            solution: `# O(m*n) time and space — DFS flood fill
def numIslands(grid: list[list[str]]) -> int:
    rows, cols = len(grid), len(grid[0])
    def dfs(r: int, c: int) -> None:
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != '1': return
        grid[r][c] = '0'   # mark visited
        dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1)
    count = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1': count += 1; dfs(r, c)
    return count`,
          },
          {
            id: 'lc-gr-2', text: '#695 Max Area of Island', tag: 'medium',
            url: 'https://leetcode.com/problems/max-area-of-island/',
            note: 'DFS returns area; track global max',
            solution: `# O(m*n) time
def maxAreaOfIsland(grid: list[list[int]]) -> int:
    rows, cols = len(grid), len(grid[0])
    def dfs(r: int, c: int) -> int:
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != 1: return 0
        grid[r][c] = 0
        return 1 + dfs(r+1,c) + dfs(r-1,c) + dfs(r,c+1) + dfs(r,c-1)
    return max(dfs(r, c) for r in range(rows) for c in range(cols))`,
          },
          {
            id: 'lc-gr-3', text: '#133 Clone Graph', tag: 'medium',
            url: 'https://leetcode.com/problems/clone-graph/',
            note: 'HashMap original→clone; DFS/BFS to visit and link',
            solution: `# O(V+E) time — DFS with visited map
def cloneGraph(node):
    visited = {}
    def dfs(node):
        if node in visited: return visited[node]
        clone = Node(node.val)
        visited[node] = clone
        for nb in node.neighbors:
            clone.neighbors.append(dfs(nb))
        return clone
    return dfs(node) if node else None`,
          },
          {
            id: 'lc-gr-4', text: '#286 Walls and Gates', tag: 'medium',
            url: 'https://leetcode.com/problems/walls-and-gates/',
            note: 'Multi-source BFS from all gates simultaneously',
            solution: `# O(m*n) time — multi-source BFS from all gates
from collections import deque

def wallsAndGates(rooms: list[list[int]]) -> None:
    rows, cols = len(rooms), len(rooms[0])
    INF = 2**31 - 1
    q = deque()
    for r in range(rows):
        for c in range(cols):
            if rooms[r][c] == 0: q.append((r, c))
    dirs = [(1,0),(-1,0),(0,1),(0,-1)]
    while q:
        r, c = q.popleft()
        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and rooms[nr][nc] == INF:
                rooms[nr][nc] = rooms[r][c] + 1
                q.append((nr, nc))`,
          },
          {
            id: 'lc-gr-5', text: '#994 Rotting Oranges', tag: 'medium',
            url: 'https://leetcode.com/problems/rotting-oranges/',
            note: 'Multi-source BFS from all rotten; count fresh, decrement',
            solution: `# O(m*n) time — multi-source BFS
from collections import deque

def orangesRotting(grid: list[list[int]]) -> int:
    rows, cols = len(grid), len(grid[0])
    q, fresh = deque(), 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1: fresh += 1
            elif grid[r][c] == 2: q.append((r, c, 0))
    minutes = 0
    dirs = [(1,0),(-1,0),(0,1),(0,-1)]
    while q:
        r, c, t = q.popleft()
        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                grid[nr][nc] = 2; fresh -= 1
                q.append((nr, nc, t + 1)); minutes = t + 1
    return minutes if fresh == 0 else -1`,
          },
          {
            id: 'lc-gr-6', text: '#417 Pacific Atlantic Water Flow', tag: 'medium',
            url: 'https://leetcode.com/problems/pacific-atlantic-water-flow/',
            note: 'Reverse BFS from each ocean; intersection = answer',
            solution: `# O(m*n) time — reverse BFS from both oceans
from collections import deque

def pacificAtlantic(heights: list[list[int]]) -> list[list[int]]:
    rows, cols = len(heights), len(heights[0])
    def bfs(starts):
        visited = set(starts)
        q = deque(starts)
        while q:
            r, c = q.popleft()
            for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
                nr, nc = r + dr, c + dc
                if (0<=nr<rows and 0<=nc<cols and
                    (nr,nc) not in visited and
                    heights[nr][nc] >= heights[r][c]):
                    visited.add((nr, nc)); q.append((nr, nc))
        return visited
    pac = bfs([(r,0) for r in range(rows)] + [(0,c) for c in range(cols)])
    atl = bfs([(r,cols-1) for r in range(rows)] + [(rows-1,c) for c in range(cols)])
    return [[r, c] for r, c in pac & atl]`,
          },
          {
            id: 'lc-gr-7', text: '#130 Surrounded Regions', tag: 'medium',
            url: 'https://leetcode.com/problems/surrounded-regions/',
            note: 'BFS from border O cells, mark safe; flip rest',
            solution: `# O(m*n) time — mark border-connected O cells as safe
from collections import deque

def solve(board: list[list[str]]) -> None:
    rows, cols = len(board), len(board[0])
    def bfs(r: int, c: int) -> None:
        q = deque([(r, c)])
        board[r][c] = 'S'
        while q:
            r, c = q.popleft()
            for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
                nr, nc = r + dr, c + dc
                if 0<=nr<rows and 0<=nc<cols and board[nr][nc]=='O':
                    board[nr][nc] = 'S'; q.append((nr, nc))
    for r in range(rows):
        for c in range(cols):
            if board[r][c]=='O' and (r in (0,rows-1) or c in (0,cols-1)):
                bfs(r, c)
    for r in range(rows):
        for c in range(cols):
            board[r][c] = 'O' if board[r][c]=='S' else 'X'`,
          },
          {
            id: 'lc-gr-8', text: '#207 Course Schedule', tag: 'medium',
            url: 'https://leetcode.com/problems/course-schedule/',
            note: 'Cycle detection in directed graph: DFS with 3 states (unvisited/visiting/visited)',
            solution: `# O(V+E) time — DFS cycle detection with 3-state coloring
from collections import defaultdict

def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    adj = defaultdict(list)
    for a, b in prerequisites: adj[a].append(b)
    # 0=unvisited, 1=visiting (in stack), 2=done
    state = [0] * numCourses
    def dfs(v: int) -> bool:
        if state[v] == 1: return False   # back edge = cycle
        if state[v] == 2: return True
        state[v] = 1
        for nb in adj[v]:
            if not dfs(nb): return False
        state[v] = 2
        return True
    return all(dfs(v) for v in range(numCourses))`,
          },
          {
            id: 'lc-gr-9', text: '#210 Course Schedule II', tag: 'medium',
            url: 'https://leetcode.com/problems/course-schedule-ii/',
            note: "Topological sort (Kahn's BFS or DFS post-order)",
            solution: `# O(V+E) time — DFS post-order topological sort
from collections import defaultdict

def findOrder(numCourses: int, prerequisites: list[list[int]]) -> list[int]:
    adj = defaultdict(list)
    for a, b in prerequisites: adj[a].append(b)
    state = [0] * numCourses   # 0=unvisited,1=visiting,2=done
    order = []
    def dfs(v: int) -> bool:
        if state[v] == 1: return False
        if state[v] == 2: return True
        state[v] = 1
        for nb in adj[v]:
            if not dfs(nb): return False
        state[v] = 2; order.append(v)
        return True
    if not all(dfs(v) for v in range(numCourses)): return []
    return order[::-1]`,
          },
          {
            id: 'lc-gr-10', text: '#323 Number of Connected Components in Undirected Graph', tag: 'medium',
            url: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/',
            note: 'Union-Find or DFS count',
            solution: `# O(n * α(n)) time — Union-Find with path compression + rank
def countComponents(n: int, edges: list[list[int]]) -> int:
    parent = list(range(n))
    rank = [0] * n
    def find(x: int) -> int:
        while parent[x] != x:
            parent[x] = parent[parent[x]]   # path compression
            x = parent[x]
        return x
    def union(x: int, y: int) -> int:
        px, py = find(x), find(y)
        if px == py: return 0
        if rank[px] < rank[py]: px, py = py, px
        parent[py] = px
        if rank[px] == rank[py]: rank[px] += 1
        return 1
    return n - sum(union(u, v) for u, v in edges)`,
          },
          {
            id: 'lc-gr-11', text: '#261 Graph Valid Tree', tag: 'medium',
            url: 'https://leetcode.com/problems/graph-valid-tree/',
            note: 'n-1 edges + no cycle (Union-Find)',
            solution: `# O(n * α(n)) time — must have n-1 edges AND no cycle
def validTree(n: int, edges: list[list[int]]) -> bool:
    if len(edges) != n - 1: return False
    parent = list(range(n))
    def find(x: int) -> int:
        while parent[x] != x:
            parent[x] = parent[parent[x]]; x = parent[x]
        return x
    for u, v in edges:
        pu, pv = find(u), find(v)
        if pu == pv: return False   # cycle found
        parent[pu] = pv
    return True`,
          },
          {
            id: 'lc-gr-12', text: '#684 Redundant Connection', tag: 'medium',
            url: 'https://leetcode.com/problems/redundant-connection/',
            note: 'Union-Find: return edge that creates first cycle',
            solution: `# O(n * α(n)) time — return first edge that creates a cycle
def findRedundantConnection(edges: list[list[int]]) -> list[int]:
    parent = list(range(len(edges) + 1))
    def find(x: int) -> int:
        while parent[x] != x:
            parent[x] = parent[parent[x]]; x = parent[x]
        return x
    for u, v in edges:
        pu, pv = find(u), find(v)
        if pu == pv: return [u, v]   # this edge causes cycle
        parent[pu] = pv
    return []`,
          },
          {
            id: 'lc-gr-13', text: '#127 Word Ladder', tag: 'hard',
            url: 'https://leetcode.com/problems/word-ladder/',
            note: 'BFS on word graph (neighbors = 1-char diff); level = transformations',
            solution: `# O(n² * L) time — BFS on implicit word graph
from collections import deque

def ladderLength(beginWord: str, endWord: str, wordList: list[str]) -> int:
    word_set = set(wordList)
    if endWord not in word_set: return 0
    q = deque([(beginWord, 1)])
    visited = {beginWord}
    while q:
        word, length = q.popleft()
        for i in range(len(word)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                next_w = word[:i] + c + word[i + 1:]
                if next_w == endWord: return length + 1
                if next_w in word_set and next_w not in visited:
                    visited.add(next_w); q.append((next_w, length + 1))
    return 0`,
          },
        ],
      },
    ],
  },
  {
    id: 'lc-dp',
    label: 'Dynamic Programming',
    weeks: 'Pattern 11',
    theme: 'danger',
    sections: [
      {
        id: 'lc-dp1-s',
        title: '1-D Dynamic Programming',
        week: '12 problems · NeetCode 150',
        items: [
          {
            id: 'lc-dp1-1', text: '#70 Climbing Stairs', tag: 'easy',
            url: 'https://leetcode.com/problems/climbing-stairs/',
            note: 'dp[i] = dp[i-1] + dp[i-2] (Fibonacci)',
            solution: `# O(n) time, O(1) space — rolling two variables
def climbStairs(n: int) -> int:
    a, b = 1, 1
    for _ in range(n - 1):
        a, b = b, a + b
    return b`,
          },
          {
            id: 'lc-dp1-2', text: '#746 Min Cost Climbing Stairs', tag: 'easy',
            url: 'https://leetcode.com/problems/min-cost-climbing-stairs/',
            note: 'dp[i] = cost[i] + min(dp[i-1], dp[i-2])',
            solution: `# O(n) time, O(1) space
def minCostClimbingStairs(cost: list[int]) -> int:
    a, b = cost[0], cost[1]
    for i in range(2, len(cost)):
        a, b = b, cost[i] + min(a, b)
    return min(a, b)`,
          },
          {
            id: 'lc-dp1-3', text: '#198 House Robber', tag: 'medium',
            url: 'https://leetcode.com/problems/house-robber/',
            note: 'dp[i] = max(dp[i-1], dp[i-2] + nums[i])',
            solution: `# O(n) time, O(1) space
def rob(nums: list[int]) -> int:
    prev, curr = 0, 0
    for n in nums:
        prev, curr = curr, max(curr, prev + n)
    return curr`,
          },
          {
            id: 'lc-dp1-4', text: '#213 House Robber II', tag: 'medium',
            url: 'https://leetcode.com/problems/house-robber-ii/',
            note: 'Circular: max(rob[0..n-2], rob[1..n-1])',
            solution: `# O(n) time — two passes: skip first or skip last house
def rob(nums: list[int]) -> int:
    def rob_range(houses: list[int]) -> int:
        prev, curr = 0, 0
        for n in houses:
            prev, curr = curr, max(curr, prev + n)
        return curr
    return max(nums[0],
               rob_range(nums[1:]),
               rob_range(nums[:-1]))`,
          },
          {
            id: 'lc-dp1-5', text: '#5 Longest Palindromic Substring', tag: 'medium',
            url: 'https://leetcode.com/problems/longest-palindromic-substring/',
            note: 'Expand around each center (odd+even); O(n²)',
            solution: `# O(n²) time, O(1) space — expand around center
def longestPalindrome(s: str) -> str:
    res = ''
    def expand(l: int, r: int) -> str:
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1; r += 1
        return s[l + 1:r]
    for i in range(len(s)):
        odd  = expand(i, i)
        even = expand(i, i + 1)
        if len(odd)  > len(res): res = odd
        if len(even) > len(res): res = even
    return res`,
          },
          {
            id: 'lc-dp1-6', text: '#647 Palindromic Substrings', tag: 'medium',
            url: 'https://leetcode.com/problems/palindromic-substrings/',
            note: 'Expand around each center, count palindromes',
            solution: `# O(n²) time — expand around center, count each
def countSubstrings(s: str) -> int:
    count = 0
    def expand(l: int, r: int) -> None:
        nonlocal count
        while l >= 0 and r < len(s) and s[l] == s[r]:
            count += 1; l -= 1; r += 1
    for i in range(len(s)):
        expand(i, i)       # odd length
        expand(i, i + 1)   # even length
    return count`,
          },
          {
            id: 'lc-dp1-7', text: '#91 Decode Ways', tag: 'medium',
            url: 'https://leetcode.com/problems/decode-ways/',
            note: 'dp[i] += dp[i-1] if valid 1-digit; += dp[i-2] if valid 2-digit',
            solution: `# O(n) time, O(n) space
def numDecodings(s: str) -> int:
    if s[0] == '0': return 0
    n = len(s)
    dp = [0] * (n + 1)
    dp[0], dp[1] = 1, 1
    for i in range(2, n + 1):
        if s[i - 1] != '0':
            dp[i] += dp[i - 1]
        two = int(s[i - 2:i])
        if 10 <= two <= 26:
            dp[i] += dp[i - 2]
    return dp[n]`,
          },
          {
            id: 'lc-dp1-8', text: '#322 Coin Change', tag: 'medium',
            url: 'https://leetcode.com/problems/coin-change/',
            note: 'dp[i] = min(dp[i - coin] + 1) for each coin; bottom-up',
            solution: `# O(amount * coins) time — bottom-up BFS
def coinChange(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount + 1):
        for c in coins:
            if a - c >= 0:
                dp[a] = min(dp[a], dp[a - c] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,
          },
          {
            id: 'lc-dp1-9', text: '#152 Maximum Product Subarray', tag: 'medium',
            url: 'https://leetcode.com/problems/maximum-product-subarray/',
            note: 'Track both maxProd and minProd (negative×negative)',
            solution: `# O(n) time, O(1) space — track max AND min (negative trick)
def maxProduct(nums: list[int]) -> int:
    res = max_p = min_p = nums[0]
    for n in nums[1:]:
        candidates = (n, max_p * n, min_p * n)
        max_p = max(candidates)
        min_p = min(candidates)
        res = max(res, max_p)
    return res`,
          },
          {
            id: 'lc-dp1-10', text: '#139 Word Break', tag: 'medium',
            url: 'https://leetcode.com/problems/word-break/',
            note: 'dp[i] = true if dp[j] and s[j..i] in wordSet for any j',
            solution: `# O(n² * m) time — bottom-up DP with word set
def wordBreak(s: str, wordDict: list[str]) -> bool:
    word_set = set(wordDict)
    dp = [False] * (len(s) + 1)
    dp[0] = True
    for i in range(1, len(s) + 1):
        for j in range(i):
            if dp[j] and s[j:i] in word_set:
                dp[i] = True; break
    return dp[len(s)]`,
          },
          {
            id: 'lc-dp1-11', text: '#300 Longest Increasing Subsequence', tag: 'medium',
            url: 'https://leetcode.com/problems/longest-increasing-subsequence/',
            note: 'dp[i] = max(dp[j]+1 where j<i and nums[j]<nums[i]); O(n²) or O(n log n) with patience sort',
            solution: `# O(n log n) time — patience sorting / binary search
import bisect

def lengthOfLIS(nums: list[int]) -> int:
    tails = []   # tails[i] = smallest tail of IS with length i+1
    for n in nums:
        i = bisect.bisect_left(tails, n)
        if i == len(tails): tails.append(n)
        else:               tails[i] = n
    return len(tails)`,
          },
          {
            id: 'lc-dp1-12', text: '#416 Partition Equal Subset Sum', tag: 'medium',
            url: 'https://leetcode.com/problems/partition-equal-subset-sum/',
            note: 'Subset sum = total/2; 0/1 knapsack DP',
            solution: `# O(n * target) time — 0/1 knapsack with set
def canPartition(nums: list[int]) -> bool:
    total = sum(nums)
    if total % 2: return False
    target = total // 2
    dp = {0}
    for n in nums:
        dp = {s + n for s in dp} | dp
        if target in dp: return True
    return False`,
          },
        ],
      },
      {
        id: 'lc-dp2-s',
        title: '2-D Dynamic Programming',
        week: '11 problems · NeetCode 150',
        items: [
          {
            id: 'lc-dp2-1', text: '#62 Unique Paths', tag: 'medium',
            url: 'https://leetcode.com/problems/unique-paths/',
            note: 'dp[r][c] = dp[r-1][c] + dp[r][c-1]',
            solution: `# O(m*n) time, O(n) space — 1D rolling array
def uniquePaths(m: int, n: int) -> int:
    dp = [1] * n
    for _ in range(m - 1):
        for j in range(1, n):
            dp[j] += dp[j - 1]
    return dp[-1]`,
          },
          {
            id: 'lc-dp2-2', text: '#1143 Longest Common Subsequence', tag: 'medium',
            url: 'https://leetcode.com/problems/longest-common-subsequence/',
            note: 'Match: dp[i][j] = dp[i-1][j-1]+1; else max(dp[i-1][j], dp[i][j-1])',
            solution: `# O(m*n) time and space
def longestCommonSubsequence(text1: str, text2: str) -> int:
    dp = [[0] * (len(text2) + 1) for _ in range(len(text1) + 1)]
    for i in range(len(text1) - 1, -1, -1):
        for j in range(len(text2) - 1, -1, -1):
            if text1[i] == text2[j]:
                dp[i][j] = 1 + dp[i + 1][j + 1]
            else:
                dp[i][j] = max(dp[i + 1][j], dp[i][j + 1])
    return dp[0][0]`,
          },
          {
            id: 'lc-dp2-3', text: '#309 Best Time to Buy and Sell Stock with Cooldown', tag: 'medium',
            url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/',
            note: 'States: holding, sold (cooldown), idle — 3-state DP',
            solution: `# O(n) time, O(1) space — 3 states: idle, holding, cooldown
def maxProfit(prices: list[int]) -> int:
    idle, hold, cool = 0, float('-inf'), 0
    for p in prices:
        idle, hold, cool = (
            max(idle, cool),        # idle: was idle or came off cooldown
            max(hold, idle - p),    # hold: keep holding or buy today
            hold + p,               # cool: just sold (cooldown next)
        )
    return max(idle, cool)`,
          },
          {
            id: 'lc-dp2-4', text: '#518 Coin Change II', tag: 'medium',
            url: 'https://leetcode.com/problems/coin-change-ii/',
            note: 'Unbounded knapsack: dp[i][a] = dp[i-1][a] + dp[i][a-coin]',
            solution: `# O(amount * coins) time — unbounded knapsack
def change(amount: int, coins: list[int]) -> int:
    dp = [0] * (amount + 1)
    dp[0] = 1
    for c in coins:
        for a in range(c, amount + 1):
            dp[a] += dp[a - c]
    return dp[amount]`,
          },
          {
            id: 'lc-dp2-5', text: '#494 Target Sum', tag: 'medium',
            url: 'https://leetcode.com/problems/target-sum/',
            note: 'Subset sum: sum(P) - sum(N) = target; dp over reachable sums',
            solution: `# O(n * sum) time — DP over reachable sums
from collections import defaultdict

def findTargetSumWays(nums: list[int], target: int) -> int:
    dp = defaultdict(int)
    dp[0] = 1
    for n in nums:
        next_dp = defaultdict(int)
        for s, cnt in dp.items():
            next_dp[s + n] += cnt
            next_dp[s - n] += cnt
        dp = next_dp
    return dp[target]`,
          },
          {
            id: 'lc-dp2-6', text: '#97 Interleaving String', tag: 'medium',
            url: 'https://leetcode.com/problems/interleaving-string/',
            note: 'dp[i][j] = s3[i+j-1] matches s1[i] or s2[j] and prior state true',
            solution: `# O(m*n) time and space
def isInterleave(s1: str, s2: str, s3: str) -> bool:
    if len(s1) + len(s2) != len(s3): return False
    dp = [[False] * (len(s2) + 1) for _ in range(len(s1) + 1)]
    dp[0][0] = True
    for i in range(1, len(s1) + 1):
        dp[i][0] = dp[i-1][0] and s1[i-1] == s3[i-1]
    for j in range(1, len(s2) + 1):
        dp[0][j] = dp[0][j-1] and s2[j-1] == s3[j-1]
    for i in range(1, len(s1) + 1):
        for j in range(1, len(s2) + 1):
            dp[i][j] = ((dp[i-1][j] and s1[i-1] == s3[i+j-1]) or
                        (dp[i][j-1] and s2[j-1] == s3[i+j-1]))
    return dp[-1][-1]`,
          },
          {
            id: 'lc-dp2-7', text: '#329 Longest Increasing Path in a Matrix', tag: 'hard',
            url: 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix/',
            note: 'DFS + memoization; cache at each cell',
            solution: `# O(m*n) time — DFS with memoization (no cycles since strictly increasing)
def longestIncreasingPath(matrix: list[list[int]]) -> int:
    rows, cols = len(matrix), len(matrix[0])
    cache = {}
    def dfs(r: int, c: int) -> int:
        if (r, c) in cache: return cache[(r, c)]
        best = 1
        for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
            nr, nc = r + dr, c + dc
            if (0<=nr<rows and 0<=nc<cols and
                matrix[nr][nc] > matrix[r][c]):
                best = max(best, 1 + dfs(nr, nc))
        cache[(r, c)] = best
        return best
    return max(dfs(r, c) for r in range(rows) for c in range(cols))`,
          },
          {
            id: 'lc-dp2-8', text: '#115 Distinct Subsequences', tag: 'hard',
            url: 'https://leetcode.com/problems/distinct-subsequences/',
            note: 'dp[i][j] = dp[i][j-1] + (s[j]==t[i] ? dp[i-1][j-1] : 0)',
            solution: `# O(m*n) time and space
def numDistinct(s: str, t: str) -> int:
    m, n = len(s), len(t)
    # dp[i][j] = ways to form t[:i] using s[:j]
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1): dp[i][0] = 1   # empty t matches any prefix
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            dp[i][j] = dp[i-1][j]
            if s[i-1] == t[j-1]:
                dp[i][j] += dp[i-1][j-1]
    return dp[m][n]`,
          },
          {
            id: 'lc-dp2-9', text: '#72 Edit Distance', tag: 'medium',
            url: 'https://leetcode.com/problems/edit-distance/',
            note: 'Match: dp[i-1][j-1]; else 1+min(insert,delete,replace)',
            solution: `# O(m*n) time and space
def minDistance(word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1): dp[i][0] = i
    for j in range(n + 1): dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j],    # delete
                                   dp[i][j-1],    # insert
                                   dp[i-1][j-1])  # replace
    return dp[m][n]`,
          },
          {
            id: 'lc-dp2-10', text: '#312 Burst Balloons', tag: 'hard',
            url: 'https://leetcode.com/problems/burst-balloons/',
            note: 'Interval DP: last balloon k in [l,r]; dp[l][r] = max coins',
            solution: `# O(n³) time — interval DP, think "last balloon to burst"
def maxCoins(nums: list[int]) -> int:
    nums = [1] + nums + [1]   # add boundary sentinels
    n = len(nums)
    dp = [[0] * n for _ in range(n)]
    # dp[l][r] = max coins from open interval (l, r)
    for length in range(2, n):
        for l in range(0, n - length):
            r = l + length
            for k in range(l + 1, r):   # k is last to burst
                dp[l][r] = max(dp[l][r],
                    nums[l] * nums[k] * nums[r] + dp[l][k] + dp[k][r])
    return dp[0][n - 1]`,
          },
          {
            id: 'lc-dp2-11', text: '#10 Regular Expression Matching', tag: 'hard',
            url: 'https://leetcode.com/problems/regular-expression-matching/',
            note: '*: zero occurrences = dp[i][j-2]; one+ = char matches and dp[i-1][j]',
            solution: `# O(m*n) time and space
def isMatch(s: str, p: str) -> bool:
    m, n = len(s), len(p)
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True
    for j in range(1, n + 1):
        if p[j-1] == '*': dp[0][j] = dp[0][j-2]   # '*' matches zero
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if p[j-1] == '*':
                dp[i][j] = dp[i][j-2]   # zero occurrences of p[j-2]
                if p[j-2] in {s[i-1], '.'}:
                    dp[i][j] = dp[i][j] or dp[i-1][j]  # one or more
            elif p[j-1] in {s[i-1], '.'}:
                dp[i][j] = dp[i-1][j-1]
    return dp[m][n]`,
          },
        ],
      },
    ],
  },
  {
    id: 'lc-greedy',
    label: 'Greedy',
    weeks: 'Pattern 12',
    theme: 'danger',
    sections: [
      {
        id: 'lc-gr2-s',
        title: 'Greedy',
        week: '8 problems · NeetCode 150',
        items: [
          {
            id: 'lc-grd-1', text: '#53 Maximum Subarray', tag: 'medium',
            url: 'https://leetcode.com/problems/maximum-subarray/',
            note: "Kadane's: maxSum = max(num, maxSum+num); track global max",
            solution: `# O(n) time, O(1) space — Kadane's algorithm
def maxSubArray(nums: list[int]) -> int:
    res = cur = nums[0]
    for n in nums[1:]:
        cur = max(n, cur + n)   # restart if cur is negative drag
        res = max(res, cur)
    return res`,
          },
          {
            id: 'lc-grd-2', text: '#55 Jump Game', tag: 'medium',
            url: 'https://leetcode.com/problems/jump-game/',
            note: 'Track max reachable index; if i > maxReach → impossible',
            solution: `# O(n) time, O(1) space — track farthest reachable index
def canJump(nums: list[int]) -> bool:
    goal = 0
    for i, n in enumerate(nums):
        if i > goal: return False
        goal = max(goal, i + n)
    return True`,
          },
          {
            id: 'lc-grd-3', text: '#45 Jump Game II', tag: 'medium',
            url: 'https://leetcode.com/problems/jump-game-ii/',
            note: 'BFS layers: extend farthest per jump; increment jumps at layer end',
            solution: `# O(n) time, O(1) space — greedy BFS layers
def jump(nums: list[int]) -> int:
    jumps = cur_end = cur_far = 0
    for i in range(len(nums) - 1):
        cur_far = max(cur_far, i + nums[i])
        if i == cur_end:           # reached end of current jump range
            jumps += 1
            cur_end = cur_far
    return jumps`,
          },
          {
            id: 'lc-grd-4', text: '#134 Gas Station', tag: 'medium',
            url: 'https://leetcode.com/problems/gas-station/',
            note: 'If total gas ≥ total cost → solution exists. Reset start on negative tank',
            solution: `# O(n) time — if solution exists, greedy finds it
def canCompleteCircuit(gas: list[int], cost: list[int]) -> int:
    if sum(gas) < sum(cost): return -1
    tank = start = 0
    for i in range(len(gas)):
        tank += gas[i] - cost[i]
        if tank < 0:
            start = i + 1   # can't start at any station in [start..i]
            tank = 0
    return start`,
          },
          {
            id: 'lc-grd-5', text: '#846 Hand of Straights', tag: 'medium',
            url: 'https://leetcode.com/problems/hand-of-straights/',
            note: 'Sort + frequency map; always consume smallest available',
            solution: `# O(n log n) time — greedy: always start group at smallest card
from collections import Counter

def isNStraightHand(hand: list[int], groupSize: int) -> bool:
    if len(hand) % groupSize: return False
    count = Counter(hand)
    for card in sorted(count):
        if count[card] > 0:
            freq = count[card]
            for i in range(groupSize):
                if count[card + i] < freq: return False
                count[card + i] -= freq
    return True`,
          },
          {
            id: 'lc-grd-6', text: '#1899 Merge Triplets to Form Target Triplet', tag: 'medium',
            url: 'https://leetcode.com/problems/merge-triplets-to-form-target-triplet/',
            note: 'Filter triplets with any component > target; check union covers target',
            solution: `# O(n) time — filter valid triplets then check union equals target
def mergeTriplets(triplets: list[list[int]], target: list[int]) -> bool:
    res = [0, 0, 0]
    for t in triplets:
        if t[0] <= target[0] and t[1] <= target[1] and t[2] <= target[2]:
            res = [max(res[i], t[i]) for i in range(3)]
    return res == target`,
          },
          {
            id: 'lc-grd-7', text: '#763 Partition Labels', tag: 'medium',
            url: 'https://leetcode.com/problems/partition-labels/',
            note: 'Last occurrence of each char; extend partition end greedily',
            solution: `# O(n) time — greedily extend partition to last seen char
def partitionLabels(s: str) -> list[int]:
    last = {c: i for i, c in enumerate(s)}
    res = []
    start = end = 0
    for i, c in enumerate(s):
        end = max(end, last[c])
        if i == end:
            res.append(end - start + 1)
            start = i + 1
    return res`,
          },
          {
            id: 'lc-grd-8', text: '#678 Valid Parenthesis String', tag: 'medium',
            url: 'https://leetcode.com/problems/valid-parenthesis-string/',
            note: 'Track min/max possible open count; * is ±1 or 0',
            solution: `# O(n) time, O(1) space — track range of valid open counts
def checkValidString(s: str) -> bool:
    lo = hi = 0   # min and max possible open count
    for c in s:
        if c == '(':   lo += 1; hi += 1
        elif c == ')': lo -= 1; hi -= 1
        else:          lo -= 1; hi += 1   # '*' = +1, 0, or -1
        if hi < 0: return False   # impossible to be valid
        lo = max(lo, 0)           # can't have negative opens
    return lo == 0`,
          },
        ],
      },
    ],
  },
];

export const LC_RESOURCES: Resource[] = [
  { id: 'lcr1', text: 'NeetCode.io — video explanations per pattern', url: 'https://neetcode.io' },
  { id: 'lcr2', text: 'NeetCode Roadmap — structured order', url: 'https://neetcode.io/roadmap' },
  { id: 'lcr3', text: 'LeetCode — practice problems', url: 'https://leetcode.com' },
  { id: 'lcr4', text: 'Blind 75 list', url: 'https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions' },
];
