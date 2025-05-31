import { useState } from "react";
import BottomSheet from "./ui/bottom-sheet";
import { motion, AnimatePresence } from "motion/react";
import Button from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router";

interface IProps {
  isOpen: boolean;
  close: () => void;
}

export default function StudyBottomSheet({ isOpen, close }: IProps) {
  const [phase, setPhase] = useState<1 | 2>(1);
  const [studyWordCount, setStudyWordCount] = useState<number>(20);

  const navigate = useNavigate();

  return (
    <BottomSheet open={isOpen} onClose={close}>
      <div className="relative w-full h-[300px] p-4 overflow-hidden ">
        <AnimatePresence mode="wait">
          {phase === 1 && (
            <motion.div
              key="phase-1"
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="absolute inset-0 flex flex-col justify-between p-4"
            >
              {/* 상단 Select */}
              <div className="flex justify-end">
                <span className="text-sm text-gray-500">Select</span>
              </div>

              {/* 중간 버튼 영역 */}
              <div className="flex flex-col gap-4 mt-8">
                <Button variant="primary" onClick={() => setPhase(2)}>
                  학습 이어하기
                </Button>
                <Button variant="primary" onClick={() => setPhase(2)}>
                  새로 학습하기
                </Button>
                <Button variant="primary" onClick={() => setPhase(2)}>
                  복습하기
                </Button>
              </div>

              {/* 여백용 */}
              <div />
            </motion.div>
          )}

          {phase === 2 && (
            <motion.div
              key="phase-2"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col justify-between p-4"
            >
              {/* 상단 타이틀 */}
              <div className="text-lg font-semibold text-center">
                학습할 단어 수를 선택하세요
              </div>

              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="default"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => setStudyWordCount((prev) => prev - 5)}
                  disabled={studyWordCount <= 0}
                >
                  <Minus />
                  <span className="sr-only">Decrease</span>
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-7xl font-bold tracking-tighter">
                    {studyWordCount}
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    <p onClick={() => setStudyWordCount(10)}>가볍게</p>
                    <p onClick={() => setStudyWordCount(20)}>적당히</p>
                    <p onClick={() => setStudyWordCount(50)}>빡세게</p>
                  </div>
                </div>
                <Button
                  variant="default"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => setStudyWordCount((prev) => prev + 5)}
                  disabled={studyWordCount >= 100}
                >
                  <Plus />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>

              {/* 하단 버튼 자리 */}
              <Button
                className="w-full"
                variant="primary"
                onClick={() => navigate("/study-1")}
              >
                학습 시작하기
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BottomSheet>
  );
}
